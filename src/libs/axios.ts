import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendAccountConfirmationSms = async (verfCode: number, phone: string) => {
  console.log("Sending Sms.....");
  const response = await axios.get(
    `https://sms.arkesel.com/sms/api?action=send-sms&api_key=${process.env.SmsApiKey}&to=${phone}&from=${process.env.AppName}&sms=Welcome to ${process.env.AppName}\n\nYour verification code is: ${verfCode}\n\nPlease enter this code on the verification page to activate your account. If you did not create an account, please ignore this message or contact support.\n\nThank you!`);
  console.log(`Sms Send Status:${response.data.code}, message:${response.data.message}`);
};
