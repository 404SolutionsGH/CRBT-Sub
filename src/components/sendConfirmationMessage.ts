import { sendAccountConfirmationSms } from "../libs/axios";
import { sendAccountConfirmationEmail } from "../libs/nodeMailer";





export const sendConfirmationMessage=async (sendingMethod:string,verfCode:number,emailAdress:string|null|undefined,phone:string|undefined,firstName:string|undefined)=>{

     if (sendingMethod === "email" && emailAdress && firstName) {
       console.log("Sending code through email..");
       // function for sending message with the code through email
       await sendAccountConfirmationEmail(verfCode, firstName, emailAdress);
     }
     else if (sendingMethod === "phone" && phone) {
       console.log("Sending code through phone....");
       // function for sending message with the code through phone number
       await sendAccountConfirmationSms(verfCode, phone);
     }


}