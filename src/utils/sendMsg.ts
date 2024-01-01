// File: util/sendMessage.ts
import msg91 from 'msg91';
import config from '@src/config/config';

export const sendMessage = async (
  mobileNo: string,
  message: string,
): Promise<unknown> => {
  const authKey = config.msg.authKey;
  const senderId = config.msg.senderId;

  // Initialize msg91 with authKey
  msg91.initialize({ authKey });

  // Get Sms object
  const sms = msg91.getSMS();

  // Prepare recipient object
  const recipient = {
    mobile: mobileNo,
    message,
  };

  // Send the message
  const response = await sms.send(senderId, recipient);

  return response;
};
