import dotenv from "dotenv";
dotenv.config();
import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { AccountSchema } from "../../schema/accountSchema";
import { tObjectId } from "../../libs/mongoose";
import { Account } from "../../components/customDataTypes";
import { Schema } from "mongoose";
import { SongSchema } from "../../schema/songSchema";
import { writeFile } from "fs/promises";
import { resolve } from "path";
import { CrbtServiceSchema } from "../../schema/crbtServiceSchema";

export const uploadController = asyncHandler(async (req: Request, res: Response) => {
  // profile(img file) and song(mp3 file) are set up by a middleware called setImgAndMp3Files
  const { id, albumName, songTitle, artisteName, profile, song, lang, ussdCode, subscriptionType } = req.body;

  console.log("Uploading a song...");
  console.log("Checking if account is of the appropriate type...");
  const accountInfo: Account | null = await AccountSchema.findOne({ _id: tObjectId(id) }).populate("service");

  if (accountInfo && accountInfo?.accountType !== "norm" && songTitle && artisteName && ussdCode && subscriptionType) {
    console.log("Checking account songs limit...");

    if (
      !(accountInfo.service instanceof Schema.Types.ObjectId) &&
      accountInfo.service.songs.length <=
        Number(
          accountInfo.service.planType === "basic"
            ? process.env.basicServiceSongsLimit
            : accountInfo.service.planType === "silver"
            ? process.env.silverServiceSongsLimit
            : process.env.goldServiceSongsLimit
        )
    ) {

       console.log("Checking if songs with this title already exist...");
        if((await SongSchema.find({ subServiceId: accountInfo.service._id ,songTitle,artisteName})).length!==0){
           console.log("A song with this title has already been uploaded");
           throw new Error("Song has already been uploaded")
        }
         console.log("Song does not exist in database");


      console.log("Songs limit not reached,upload can proceed");
      console.log("Saving info about song...");
      const songDataSaved = await SongSchema.create({ songTitle, artisteName, lang: lang ? lang : "eng", subServiceId: accountInfo.service._id, albumName: albumName ? albumName : "N/A" ,ussdCode,subscriptionType});
      console.log("Song Info saved sucessfully");

      // Saving song's profile image and mp3 file using the ObjectId of it saved info
      console.log("Saving song profile image and mp3 files");

      if (profile) {
        // checking if the profile was set(this is because is not compulsory to upload an image when uploading a sond)
        await writeFile(resolve(__dirname, `./songsData/songsProfileImages/${songDataSaved._id}${profile.exetension}`), profile.data);
      }
      await writeFile(resolve(__dirname, `./songsData/songs/${songDataSaved._id}${song.exetension}`), song.data);
      console.log("Files sucessfully saved..");

      console.log("Updating profile and song section of song info with saved info ObjectId...");
      await SongSchema.updateOne(
        { _id: songDataSaved._id },
        { $set: { profile: profile ? `/${String(songDataSaved._id)}${profile.exetension}` : "/defaultProf.png", song: `/${String(songDataSaved._id)}${song.exetension}` } }
      );
      console.log("Updating this account's crbt service document by adding the saved song's id....");
      await CrbtServiceSchema.findOneAndUpdate({ _id: accountInfo.service._id }, { $push: { songs: { $each: [songDataSaved._id], $position: 0 } } });
      console.log("Update done");

      res.status(200).json({ message: "Song saved successfully" });
    } else {
      console.log("Songs upload limit reached");
      throw new Error("Songs upload limit reached");
    }
  } else {
    if (!songTitle || !artisteName || !ussdCode || !subscriptionType) {
      res.status(400);
      throw new Error("Song upload failed ,Invalid request body");
    }
    res.status(401);
    throw new Error(!accountInfo?.service ? "Do not have an CRBT service to upload songs to" : "This account type is not authorized to upload a song");
  }
});
