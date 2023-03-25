import React from 'react';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/actions/userActions';

const Header = ({isAuthenticated= false, user}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const {isAuthenticated} = useSelector(state=>state.user)
  // const user  ={
  //   role:"admin"
  // }

  const dispatch = useDispatch()
  const logoutHandler =()=>{
    dispatch(logoutAction())


    // window.alert("logut successfully")
    onClose()
  }
  return (
    <>
      <ColorModeSwitcher />

      <Button
        onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={12}
        zIndex={"overlay"}
        rounded="full"
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(5px'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'3px'}>COURSE BUNDLER</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'} onClose={onClose}>
              <LinkButton url="/" title="Home" onClose={onClose} />
              <LinkButton url="/courses" title="Browse All courses" onClose={onClose} />
              <LinkButton url="/request" title="Request a course" onClose={onClose} />
              <LinkButton url="/contact" title="Contact us"  onClose={onClose}/>
              <LinkButton url="/about" title="About us"  onClose={onClose}/>

              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2em'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <Link  onClick={onClose} to="/profile">
                          <Button variant={'ghost'} colorScheme={'yellow'}>
                            Profile
                          </Button>
                          
                        </Link>
                        <Button variant={'ghost'} colorScheme={'yellow'} onClick={logoutHandler} >
                            <RiLogoutBoxLine/>
                            Logout
                          </Button>
                      </HStack>
                      {
                        user && user.role === "admin" && <Link to="/admin/dashboard" onClick={onClose}>
                        
                          <Button colorScheme={"purple"}  variant={"ghost"}>
                            <RiDashboardFill style={{ margin:4}}/>
                          Dashboard
                          </Button>
                        </Link>
                      }
                    </VStack>
                  </>
                ) : (
                  <>
                    <Link onClick={onClose} to="/login">
                      <Button colorScheme={'yellow'}>Login</Button>
                    </Link>
                    <p>OR</p>
                    <Link onClick={onClose}>
                      <Button colorScheme={'yellow'}>Register</Button>
                    </Link>
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;

function LinkButton({ url = '/', title = 'Home' , onClose}) {
  return (
    <Link to={url} onClick={onClose}>
      <Button variant={'ghost'}>{title}</Button>
    </Link>
  );
}
