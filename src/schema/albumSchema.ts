import mongoose, { Schema } from "mongoose";

// the Album Schema
const albumSchema = new mongoose.Schema({
  name: String,
  artisteName: String,
  numOfSongs: Number,
  numOfListners: Number,
  numSubscribers: Number,
});

export const AlbumSchema = mongoose.model("Album", albumSchema);
