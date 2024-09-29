import multer from "multer";

export const getFilesFromReq = () => {
  return multer().fields([
    { name: "profile", maxCount: 1 },
    { name: "song", maxCount: 1 },
  ]);
};

export const getArrayOfFiles=()=>{
  return multer().fields([{name:"song",maxCount:40}])
}
