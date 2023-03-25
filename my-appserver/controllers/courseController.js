
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Course } from "../models/courseModel.js"
import { Stats } from "../models/statModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import getDataUri from "../utils/dataUri.js"
import cloudinary from 'cloudinary'





export const deleteLecture =   catchAsyncError  (async (req, res, next) =>{
    const {courseId, lectureId} = req.query
       
      const course = await  Course.findById(courseId)
   
      if(!course) return next (new ErrorHandler("course not found ", 404))
      // console.log(course);
 
const lecture = course.lectures.find((item)=>item._id.toString() === lectureId.toString())
  
await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
    resource_type: "video",
  });
  
 course.lectures = course.lectures.filter(item=>item._id.toString()!== lectureId.toString())
 console.log("course.lectures.length===",course.lectures.length);
course.numOfVideos = course.lectures.length

 await course.save()
  
  res.status(200).json({
      success:true,
      message:"lecture removed  successfully "
  })
    
  })
  


export const deleteCourse =   catchAsyncError  (async (req, res, next) =>{
  const {id} = req.params
     
    const course = await  Course.findById(id)
 
    if(!course) return next (new ErrorHandler("course not found ", 404))
    // console.log(course);
  await cloudinary.v2.uploader.destroy(course.poster.public_id)


  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];
    // console.log(singleLecture.video.public_id);
    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });

  }



await course.deleteOne()


res.status(200).json({
    success:true,
    message:"course deleted successfully "
})
  
})








//max vidoe mB is 100MB
export const addLecture =   catchAsyncError  (async (req, res, next) =>{
  const {id} = req.params
  const {title, description} = req.body


  const file  = req.file
//    console.log("fil=== "+file);

  const fileUri = getDataUri(file)
  // console.log(fileUri.content);
//   const masterArr =[]
//   for (const iterator of file) {
//     console.log("iterator=="+iterator);
//   const fileUri = getDataUri(iterator)
//   masterArr.push(fileUri)
//   }
// //  console.log("masterArr==="+masterArr);
//  console.log("masterArr[0]==="+masterArr[0].content);

     
    const course = await  Course.findById(id)
    if(!course) return next (new ErrorHandler("course not found ", 404))

// clodunarary here
const mycloud = await cloudinary.v2.uploader.upload(fileUri.content , {

    resource_type:"video"
})

course.lectures.push({
   title, 
   description , 

   video:{
       public_id :mycloud.public_id, 
       url:mycloud.secure_url
   },

})



console.log("course.lectures.length===",course.lectures.length);

course.numOfVideos = course.lectures.length

await course.save()

res.status(200).json({
    success:true,
    message :'Lecture added to course'
})
  
})



export const getCourseDetail =   catchAsyncError  (async (req, res, next) =>{

    // console.log(req.params.id);
     
    const course = await  Course.findById(req.params.id)
    if(!course) return next (new ErrorHandler("course not found ", 404))
  course.views+=1

  await course.save()



res.status(200).json({
    success:true,
    lectures:course.lectures
})
  
})



export const createcourse =   catchAsyncError  (async (req, res, next) =>{

    const {title, description , category, createdBy}  = req.body
   if(!title  ||  !description || ! category || !createdBy) {
    return next( new ErrorHandler("Please add all fiels  " , 400))
   }



     const file  = req.file

    //  console.log(file);
    const fileUri = getDataUri(file)
    // console.log(fileUri.content);


    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content)

 await Course.create({
    title, 
    description , 
    category, 
    createdBy,
    poster:{
        public_id :mycloud.public_id, 
        url:mycloud.secure_url
    },

 })

res.status(201).json({
    success:true,
    message :"course created successfully "
})
  
})

export const getAllCourses =   catchAsyncError  (async (req, res, next) =>{
  const category = req.query.category || ""
  const keyword = req.query.keyword || ""


     console.log({category});
     console.log(req.query);

    const courses = await  Course.find({
      title:{
        $regex:keyword,
        $options:"i"
      }, 

      category: {
        $regex: category,
        $options: "i",
      },
    }).select("-lectures")


res.status(200).json({
    success:true,
    courses
})
  
})

Course.watch().on("change", async()=>{
  const stats = await Stats.find({}).sort({createdAt :"desc"}).limit(1)
  const courses = await Course.find({})
 let totalViews = 0
 try {

  for (let i = 0; i < courses.length; i++) {
     
    totalViews += courses[i].views
    
  }
stats[0].views = totalViews

stats[0].createdAt = new Date(Date.now())

await stats[0].save()
  
 } catch (error) {
  console.log(error);
 }
  
})