import mongoose, { Schema } from "mongoose";

// the userSchema
const crbtServiceSchema = new mongoose.Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  serviceName: String,
  planType:{
    type:String,
    enum:["basic","gold","silver"],
    default:"basic"
  },
  songs: Array, // array of the songs id 
  albums: Array, // array of strings of album names
  category:String,
   date: {
    type: String,
    default: new Date().toISOString(), // format: YYYY-MM-DDThh:mm:ss.741Z    NB: T is what separate the date from the time. 
  },
  numberOfSubscribers: Number,
});

export const CrbtServiceSchema = mongoose.model("CrbtService", crbtServiceSchema);
