import mongoose, { Schema } from "mongoose";

// the Album Schema
const albumSchema = new mongoose.Schema({
  name: String,
  artisteName: String,
  numOfSongs: Number,
  numOfListners: {
    type: Number,
    default: 0,
  },
  numSubscribers: {
    type: Number,
    default: 0,
  },
  profile:String
});

export const AlbumSchema = mongoose.model("Album", albumSchema);
