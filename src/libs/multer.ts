import multer from "multer";

export const getFilesFromReq = (profilleName:string|null=null,songName:string|null=null) => {
  return multer().fields([
    { name: profilleName?profilleName:"profile", maxCount: 1 },
    { name: songName?songName:"song", maxCount: 1 },
  ]);
};


export const getArrayOfFiles=()=>{
  return multer().fields([{name:"song",maxCount:40}])
}
