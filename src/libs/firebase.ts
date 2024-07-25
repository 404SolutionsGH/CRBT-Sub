import dotenv from "dotenv"
dotenv.config()
const admin = require("firebase-admin");
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY) : "";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



export const verifyTokenIdFromFirebase= async(idToken:string)=>{
return await admin.auth().verifyIdToken(idToken);
}