import sgMail from '@sendgrid/mail';
import config from '@src/config/config';

interface IEmailAttachment {
  content: string;
  filename: string;
  type: string;
}

export const sendMail = async (
  to: string,
  subject: string,
  html: string,
  text: string,
  attachments?: IEmailAttachment[],
): Promise<[sgMail.ClientResponse, Record<string, never>]> => {
  sgMail.setApiKey(config.email.sendgridApi);
  const msg: sgMail.MailDataRequired = {
    to,
    from: config.email.from,
    subject,
    html,
    text,
    attachments,
  };
  const sentMsg = await sgMail.send(msg);
  return sentMsg;
};

/*
const testMail = async () => {
  console.log('here');
  const mail = await sendMail(
    'vedavratpp@gmail.com',
    'testing sendgrid',
    '<h1>Hey</h1>',
    'Test mail in text',
  );
  console.log('mail', mail);
  return mail;
};
console.log(testMail());
*/
