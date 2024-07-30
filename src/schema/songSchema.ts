import mongoose, { Schema } from "mongoose";

// the songSchema
const songSchema = new mongoose.Schema({

  _id:Schema.Types.ObjectId,
  subServiceId: {
    type: Schema.Types.ObjectId,
    ref: "CrbtService",
  },
  albumName:String,
  songTitle: String,
  artisteName: String,
  profile: {
    type: String,
  },
  song:String,
  lang: String,
  date: {
    type: String,
    default: new Date().toISOString(), // format =YYYY-MM-DDThh:mm:ss.741Z nb: T is what separate the date from the time. 
  },
  numberOfListeners: Number,
  numberOfSubscribers: Number,
  ussdCode:String,
  subscriptionType:{
    type:String,
    enum:["weekily","monthly","daily"]
  }
});

export const SongSchema = mongoose.model("Song", songSchema);
