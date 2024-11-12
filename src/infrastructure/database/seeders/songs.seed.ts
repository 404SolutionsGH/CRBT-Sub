import { Song } from "../../../domain/entities/Song";

export const SongSeeder = async () => {
  const data = [
    {
      id: 1,
      songTitle: "Calm Down",
      ownerId:1,
      artisteName: "Rema",
      albumName: "Best Hits",
      ussdCode: "*123#",
      registrationUssdCode: "*456#",
      price: "5",
      category: "Hip-hop",
      tune: "https://crbtbackend.trotro.live/api/v1/songs/listen/N06mBCNRRUQn7kYwRsVV.mp3",
      lang: "English",
      profile: "https://crbtbackend.trotro.live/api/v1/songs/profile/lnnmZyyhdzOLYQg3fcpt.jpeg",
      subscriptionType: "monthly",
    },
  ];
  await Song.bulkCreate(data);
};
