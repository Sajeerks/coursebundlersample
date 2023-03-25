import { Box, Button, Grid, HStack, Heading, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import cursor  from "../../../assets/images/cursor.png"
import Sidebar from '../Sidebar'
import { RiDeleteBin7Fill } from 'react-icons/ri'
const Users = () => {

  const users =[{
    _id:";sajeer is ", 
    name:"sajer munna", 
    email:"sajeersayd@gmail.com",
    role:"admin",

    subscription:{
      status:"active"
    }
  },]

  const deleteUserHandler =(id)=>{
    console.log(id);

  }

  const updateHandler =(id)=>{
console.log(id);
  }
  return (
      <Grid       css={{
        cursor: `url(${cursor}), default`,
      }} minH={"100vh"}       templateColumns={['1fr', '5fr 1fr']} >

    <Box p={["0", "16"]} overflowX={"auto"}>
    <Heading children="ALL Users" m={'8'} />
    
    <TableContainer w={["100vw","full"]}> 
       <Table variant={"simple"} size='lg'>
        <TableCaption >All avalibale Users in the database</TableCaption>
         <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Role</Th>
            <Th>SUbscription</Th>
            <Th isNumeric>Action</Th>

          </Tr>
         </Thead>
         <Tbody>
          {users.map((item, index)=>(
              <Row key={item._id} item={item} deleteUserHandler={deleteUserHandler}  updateHandler={updateHandler}/>
          ))}
 
         </Tbody>

       </Table>
     </TableContainer>

    </Box>
    <Sidebar/>
      </Grid>

   )
}

export default Users

function Row({item ,updateHandler, deleteUserHandler}){

  return (
<Tr>
  <Td> #{item._id}</Td>
  <Td> {item.name}</Td>
  <Td> {item.email}</Td>
  <Td> {item.role}</Td>
  <Td> {item.subscription.status==="active"?"Active":"Not Action"}</Td>
  <Td isNumeric><HStack justify={"flex-end"}>
    <Button variant={"outline"} color="purple.500" onClick={()=>updateHandler(item._id)}> Change Role</Button>
    <Button color="purple.600" onClick={()=>deleteUserHandler(item._id)}> <RiDeleteBin7Fill/></Button>
    </HStack></Td>


</Tr>


  )
}