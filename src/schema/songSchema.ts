import mongoose, { Schema } from "mongoose";
import { Song } from "../components/customDataTypes";

// the songSchema
const songSchema = new mongoose.Schema<Song>({
  _id: Schema.Types.ObjectId,
  ownerId: {
    type: Schema.Types.ObjectId,
  },
  albumName: String,
  songTitle: String,
  artisteName: String,
  profile: {
    type: String,
  },
  song: String,
  lang: String,
  date: {
    type: String,
    default: new Date().toISOString(), // format =YYYY-MM-DDThh:mm:ss.741Z nb: T is what separate the date from the time.
  },
  numberOfListeners: {
    type: Number,
    default: 0,
  },
  numberOfSubscribers: {
    type: Number,
    default: 0,
  },
  ussdCode: String,
  subscriptionType: {
    type: String,
    enum: ["weekily", "monthly", "daily"],
  },
  price: String,
  category:String
});

export const SongSchema = mongoose.model("Song", songSchema);
