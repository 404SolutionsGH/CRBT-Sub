import { AppError } from "../../domain/entities/AppError";
import { SongRepoImpl } from "../../infrastructure/repository/songRepoImplementaion";

export const getASong = async (id: number) => {
  const { findSongById } = new SongRepoImpl();
  const song = await findSongById(id);
  if (song) return song;
  throw new AppError("No song with such id exist", 404);
};
