import {
  Avatar,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/intro.mp4';
import { RiSecurePaymentFill } from 'react-icons/ri';
import termsAndCondition from "../../assets/docs/termsAndCondition"



const TandC =({termsAndCondition})=>(
  <Box size={"md"} children="Terms and Conditions" textAlign={["center", "left"]} my="4">
   <Box h="sm" p="4"  overflowY={"scroll"}>
  <Text  textAlign={["center", "left"]} letterSpacing={"widest"}  > {termsAndCondition}</Text>

  <Heading children="Refund only applies for cancellation within 7 days"/>
   </Box>
  </Box>
)


const Founder = () => {
  return (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>
      <VStack>
        <Avatar boxSize={['40', '48']} />
        <Text children="Co-Founder" opacity={0.7} />
      </VStack>
      <VStack justifyContent={"center"} alignItems={["center" , "flex-start"]}>
        <Heading children="Abishek singh" size={['md', 'xl']} />
        <Text
          children="Hi im a full stack devoloper , making reasonable itmes for the general 
          public Hi im a full stack devoloper , making reasonable itmes for the general public "
          opacity={0.7}
        />
      </VStack>
    </Stack>
  );
};


const VideoPlayer  =()=>(
        <Box>
            <video 
             autoPlay
             muted
             loop
            controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}>

            </video>
        </Box>
)
const About = () => {
  return (
    <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
      <Heading children="About Us" textAlign={['center', 'left']} />

      <Founder />

        <Stack m="8" direction={["column","row"]} alignItems={"center"}>

            <Text fontFamily={"cursive"} m="8"  textAlign={["center", "left"]} children ="We are a streaming platform the provide streaming services for premuim users alone" />
            <Link to ="/subsribe">
                    <Button variant={"ghost"} colorScheme='yellow'>  Chekcout</Button></Link>
        </Stack>
        <VideoPlayer/>

        <TandC termsAndCondition={termsAndCondition} />
        <HStack m="4" p="4">
        <RiSecurePaymentFill />
          <Heading size="xs" fontFamily={"sans-serif"} textTransform={"uppercase"} children="Payment is secured by RazorPay  "/>
        </HStack>

    </Container>
  );
};

export default About;
