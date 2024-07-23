import mongoose, { Schema } from "mongoose";

// the userSchema
const crbtServiceSchema = new mongoose.Schema({
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  },
  serviceName: String,
  servicePrice: String,
  songs: Array,
  albums: Array,
  lang: String,
  date: {
    type: String,
    required: true,
  },
});

export const CrbtServiceSchema = mongoose.model("CrbtService", crbtServiceSchema);
