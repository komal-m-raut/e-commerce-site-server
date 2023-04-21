import sgMail from '@sendgrid/mail';
import config from '@src/config/config';

interface IEmailAttachment {
  content: string;
  filename: string;
  type: string;
}

export const sendMail = async (mailOptions: {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: IEmailAttachment[];
}): Promise<[sgMail.ClientResponse, Record<string, never>]> => {
  sgMail.setApiKey(config.email.sendgridApi);
  const { to, subject, html, text, attachments } = mailOptions;
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
