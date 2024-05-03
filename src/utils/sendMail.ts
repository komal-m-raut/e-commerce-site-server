// import sgMail from '@sendgrid/mail';
// import config from '@src/config/config';

import config from '@src/config/config';
import axios from 'axios';
import { BadRequestError } from './apiError';
import { NextFunction } from 'express';

// interface IEmailAttachment {
//   content: string;
//   filename: string;
//   type: string;
// }

// export const sendMail = async (mailOptions: {
//   to: string;
//   subject: string;
//   html: string;
//   text: string;
//   attachments?: IEmailAttachment[];
// }): Promise<[sgMail.ClientResponse, Record<string, never>]> => {
//   sgMail.setApiKey(config.email.sendgridApi);
//   const { to, subject, html, text, attachments } = mailOptions;
//   const msg: sgMail.MailDataRequired = {
//     to,
//     from: config.email.from,
//     subject,
//     html,
//     text,
//     attachments,
//   };
//   const sentMsg = await sgMail.send(msg);
//   return sentMsg;
// };

export const sendMail = async (
  mailOptions: {
    recipients: {
      to: { name: string; email: string }[];
      cc?: { name: string; email: string }[];
      bcc?: { name: string; email: string }[];
      variables?: { [key: string]: string };
    }[];
    attachments?: {
      file?: string;
      filePath?: string;
      fileName?: string;
    }[];
    templateType: 'otp';
  },
  next: NextFunction,
): Promise<void> => {
  const templates = {
    otp: 'global_otp',
  };
  try {
    const response = await axios.post(
      'https://control.msg91.com/api/v5/email/send',
      {
        recipients: mailOptions.recipients,
        from: {
          name: 'Moreshop',
          email: config.email.from,
        },
        domain: config.email.domain,
        attachments: mailOptions.attachments ?? [],
        template_id: templates[mailOptions.templateType],
      },
      {
        headers: {
          authkey: config.msg.authKey,
        },
      },
    );
    return response.data;
  } catch (err: any) {
    console.log('error', err, err?.response?.data);
    throw next(new BadRequestError('Error sending email'));
  }
};
