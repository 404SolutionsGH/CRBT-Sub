import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { PaymentInfo } from "../domain/entities/Transactions";
import { ChapaPaymentLink } from "../@common/constants/string";
import { SystemRepoImpl } from "../infrastructure/repository/systemRepoImplementation";

export const sendAccountConfirmationSms = async (verfCode: number, phone: string) => {
  console.log("Sending Sms.....");
  const response = await axios.get(
    `https://sms.smsnotifygh.com/smsapi?key=${process.env.SmsApiKey}&to=${phone}&msg=Welcome to ${process.env.AppName}\n\n Your verification code is: ${verfCode}\n\n Please enter this code on the verification page to activate your account.&sender_id=CRBT`
  );
  console.log(`Sms Send Status:${response.data.code}, message:${response.data.message}`);
};

// this method return the url to the checkout page if sucessfull or null if not.
export const paymentRequest = async (paymentInfo: PaymentInfo) => {
  const { amount, callBackUrl, currency, phoneNumber, returnUrl, txRef } = paymentInfo;
  const { getChapaSecretkey } = new SystemRepoImpl();
  const response = await axios.post(
    ChapaPaymentLink,
    { amount, currency, callback_url: callBackUrl, return_url: returnUrl, phone_number: phoneNumber, tx_ref: txRef },
    { headers: { Authorization: `Bearer ${await getChapaSecretkey(undefined)}` } }
  );

  console.log(`Payment request status code=${response.status}`);
  const { data } = response.data;

  if (data) {
    return data.checkout_url as string;
  }
  return null;
};
