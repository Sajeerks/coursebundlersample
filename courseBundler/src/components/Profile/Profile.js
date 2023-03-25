import {
  Avatar,
  Button,
  Container,
  HStack,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RiDeleteBin7Fill } from 'react-icons/ri';
import {fileUploadCss} from '../Auth/Register'
import { updateProfilePictureAction } from '../../redux/actions/profileActions';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction } from '../../redux/actions/userActions';
import { toast } from 'react-hot-toast';



const Profile = ({user}) => {
  // const user = {
  //   name: 'Munna',
  //   email: 'saheer@minna.com',
  //   createdAt: String(new Date().toISOString()),
  //   role: 'user',
  //   subscription: {
  //     status: 'ddd',
  //   },

  //   playlist:[
  //       {  course:"firstCouse" , poster:"first poster"}
  //   ]
  // };

  const { isOpen, onClose, onOpen } = useDisclosure();


  const removeFromPlaylistHandler = async id => {
   
  };

    const dispatch = useDispatch()
    const navigate  = useNavigate()
    const {loading, error, message} = useSelector(state=>state.profile)

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault()
    const myform = new FormData()
    myform.append("file" , image)

  
  
   await dispatch(updateProfilePictureAction(myform))
  //  setTimeout(async() => {
    await dispatch(loadUserAction())
  //  }, 3000);
   
   
   navigate("/profile")
  }
  
  useEffect(() => {

        if(error){
          toast.error(error)
        
          dispatch({type:"clearError"})
        }
        if(message){
          toast.success(message)
      

          dispatch({type:"clearMessage"})
        }
    
  }, [error, message, dispatch])
  

  return (
    <Container minH={'95vh'} maxW="container.lg" py="8">
      <Heading children="Profile" m="8" textTransform={'uppercase'} />

      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={'center'}
        spacing={['8', '16']}
      >
        <VStack>
          <Avatar boxSize={'48'}  src={user.avatar.url && user.avatar.url}/>
          <Button colorScheme="yellow" variant={'ghost'} onClick={onOpen}>
            Change Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack>
            <Text children="Name" fontWeight={'bold'} />
            <Text children={user.name && user.name} />
          </HStack>{' '}
          <HStack>
            <Text children="Email" fontWeight={'bold'} />
            <Text children={user.email && user.email} />
          </HStack>{' '}
          <HStack>
            <Text children="CreatedAT" fontWeight={'bold'} />
            <Text children={user.createdAt && user.createdAt.split('T')[0]} />
          </HStack>{' '}
          {user.role !== 'admin' && (
            <HStack>
              <Text children="Subscription" fontWeight={'bold'} />
              {user.subscription?.status  && user.subscription.status === 'active' ? (
                <Button colorScheme="yellow"> Cancel Subscription </Button>
              ) : (
                <Link to="/subscribe">
                  {' '}
                  <Button colorScheme="yellow">Subscripbe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={['column', 'row']} alignItems={'center'}>
            <Link to="/updateprofile">
              {' '}
              <Button> Update Profile</Button>{' '}
            </Link>
            <Link to="/changepassword">
              {' '}
              <Button > Change Password</Button>{' '}
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading    children="Playlist" size="md"  my="8" />

      {
       user.playlist.length >0 && (
        <Stack direction={["column","row"]} alignItems={"center"} flexWrap={"wrap"} p="4">
               {user.playlist.map((element, index)=>(
                  <VStack w="48" m="2" key={element.course}>
                    <Image boxSize={"full"} objectFit={"contain"} src={element.poster}/>

                    <HStack>
                        <Link to={`/course/${element.course}`}>
                         <Button variant={"ghost"} colorScheme='yellow'> Watch NOw </Button>
                        </Link>

 
                        <Button
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>


                    </HStack>

                  </VStack>
               ))}
     
             
        </Stack>
       )
      }



<ChangePhotoBox isOpen={isOpen}    changeImageSubmitHandler={changeImageSubmitHandler} loading={loading}
        onClose={onClose}/>
    </Container>
  );
};

export default Profile;


function ChangePhotoBox({

  isOpen,
  onClose,
  changeImageSubmitHandler,
 loading
}){

  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  // const {loading, message, error} = useSelector(state=>state.profile)

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev('');
    setImage('');
  };
  // const dispatch = useDispatch()
//   useEffect(() => {

//     if(error){
//       toast.error(error)
    
//       dispatch({type:"clearError"})
//     }
//     if(message){
//       toast.success(message)

//       dispatch({type:"clearMessage"})
        

//     }

// }, [error, message, dispatch])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter={'blur(10px)'}/>
      <ModalContent>
      <ModalHeader>Change Photo</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
          <Container>
          <form onSubmit={e => changeImageSubmitHandler(e, image)}>
                   <VStack spacing={"8"}>
                   {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}
                      <Input type={"file" }css={{"&::file-selector-button" :fileUploadCss}}  onChange={changeImage}/>
                   </VStack>
                   <Button w="full" colorScheme='yellow' type='submit' isLoading={loading}>Change</Button>
               </form>

          </Container>
      </ModalBody>


      <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>

        
      
    </Modal>
  )
}
