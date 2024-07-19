import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendAccountConfirmationSms = async (verfCode: number, phone: string) => {
  console.log("Sending Sms.....");
  const response = await axios.get(
    `https://sms.smsnotifygh.com/smsapi?key=${process.env.SmsApiKey}&to=${phone}&msg=Welcome to ${process.env.AppName}\n\n Your verification code is: ${verfCode}\n\n Please enter this code on the verification page to activate your account.&sender_id=CRBT`
  );
  console.log(`Sms Send Status:${response.data.code}, message:${response.data.message}`);
};
