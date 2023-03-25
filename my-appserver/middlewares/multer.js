import multer from "multer"

const storage = multer.memoryStorage()

const singleUpload = multer({storage}).single("file")
// const singleUpload = multer({storage}).array("file" , 3)






export default singleUpload

