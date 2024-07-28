import multer from "multer";

export const getFilesFromReq = () => {
  return multer({ limits: { fileSize: 10000000 } }).fields([
    { name: "profile", maxCount: 1 },
    { name: "song", maxCount: 1 },
  ]);
};
