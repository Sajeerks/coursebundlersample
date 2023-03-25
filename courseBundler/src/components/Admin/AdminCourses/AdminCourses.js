import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr,  Modal,
  // ModalOverlay,
  // ModalContent,
  // ModalHeader,
  // ModalFooter,
  // ModalBody,
  // ModalCloseButton,
  Image,
  useDisclosure, } from '@chakra-ui/react'
import React from 'react'
import cursor  from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import CourseModal from './CourseModal'
const AdminCourses = () => {

  const { isOpen, onClose, onOpen } = useDisclosure();

  const courses =[{
    _id:";sajeer is ", 
    title:"react course", 
    category:"werb devolopment @gmail.com",
    poster:{
      url:"https://img-cdn.pixlr.com/pixlr-templates/63f2d18be892487a54cb29a4/preview.webp"
    },

    createdBy:"6 pack programmer", 
    views:123,
    numOfVideos:888
  },]

  const deleteUserHandler =(id)=>{
    console.log(id);


  }

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    // await dispatch(addLecture(courseId, myForm));
    // dispatch(getCourseLectures(courseId));
  };

  const coursDetailsHandler =(id)=>{
console.log("coursDetailsHandler"+id);
onOpen()
  }

  const deleteLectureButtonHandler = (courseId, lectureId) => {
    console.log(courseId);
    console.log(lectureId);

    

  };
  return (
      <Grid       css={{
        cursor: `url(${cursor}), default`,
      }} minH={"100vh"}       templateColumns={['1fr', '5fr 1fr']} >

    <Box p={["0", "16"]} overflowX={"auto"}>
    <Heading children="Admin Courses" m={'8'} />
    
    <TableContainer w={["100vw","full"]}> 
       <Table variant={"simple"} size='lg'>
        <TableCaption >All avalibale Courses</TableCaption>
         <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Poster</Th>
            <Th>Title</Th>
            <Th>Category</Th>
            <Th>Creator</Th>
            <Th isNumeric>Views</Th>
            <Th isNumeric>No of Videos</Th>
            <Th isNumeric>Action</Th>


          </Tr>
         </Thead>
         <Tbody>
          {courses.map((item, index)=>(
              <Row key={item._id} item={item} deleteUserHandler={deleteUserHandler}  coursDetailsHandler={coursDetailsHandler}/>
          ))}
 
         </Tbody>

       </Table>
     </TableContainer>
 
     <CourseModal   
         id ={"sampale aid apala"}        
       deleteButtonHandler={deleteLectureButtonHandler}
       addLectureHandler={addLectureHandler}
           
     courseTitle ="react course stater"
   isOpen={isOpen}
          onClose={onClose}  />

    </Box>
    <Sidebar/>
      </Grid>

   )
}

export default AdminCourses


function Row({item ,coursDetailsHandler, deleteUserHandler}){

  return (
<Tr>
  <Td> #{item._id}</Td>
  <Td> {<Image src={item.poster.url}/>}</Td>

  <Td> {item.title}</Td>
  <Td textTransform={"uppercase"}> {item.category}</Td>
  <Td isNumeric> {item.createdBy}</Td>
 
  <Td isNumeric> {item.views}</Td>
  <Td isNumeric> {item.numOfVideos}</Td>

  
  <Td isNumeric><HStack justify={"flex-end"}>
    <Button variant={"outline"} color="purple.500" onClick={()=>coursDetailsHandler(item._id)}> View Lectures</Button>
    <Button color="purple.600" onClick={()=>deleteUserHandler(item._id)}> <RiDeleteBin7Fill/></Button>
    </HStack></Td>


</Tr>


  )
}