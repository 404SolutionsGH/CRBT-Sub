import { sendAccountConfirmationSms } from "../libs/axios";
import { sendAccountConfirmationEmail } from "../libs/nodeMailer";





export const sendConfirmationMessage=async (sendingMethod:string,verfCode:number,emailAdress:string|undefined,phone:string|undefined,username:string|undefined)=>{

     if (sendingMethod === "email" && emailAdress && username) {
       console.log("Sending code through email..");
       // function for sending message with the code through email
       await sendAccountConfirmationEmail(verfCode, username, emailAdress);
     }
     else if (sendingMethod === "phone" && phone) {
       console.log("Sending code through phone....");
       // function for sending message with the code through phone number
       await sendAccountConfirmationSms(verfCode, phone);
     }


}