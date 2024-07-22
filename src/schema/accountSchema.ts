import mongoose from "mongoose";

// the userSchema
const accountSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "N/A",
  },
  lastName: {
    type: String,
    default: "N/A",
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default:"N/A"
  },
  accountType: {
    type: String,
    enum: ["norm", "admin", "superAdmin"],
  },

  authorizationMethod: {
    type: String,
    enum: ["phone", "email"],
    default: "phone",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verfCode: {
    type: Number,
    default: 0,
  },

  langPref:{
    type:String,
    required:true
  },
  accountBalance: String, // for only normal users
  subscribedServices: Array, // for only normal users
  unsubscribeService: Array, // for only normal users
  transactionHistory: Array, // for only normal users
  paymentInfo: Array, // this for only admin accounts
});

export const AccountSchema = mongoose.model("Account", accountSchema);
