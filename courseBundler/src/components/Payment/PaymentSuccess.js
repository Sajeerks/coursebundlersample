import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <Container h="90vh" p="16">
      <Heading children="you have a pro pack" textAlign={'center'} my="8" />
      <VStack
        boxShadow={'lg'}
        pb="16"
        alignItems={'center'}
        borderRadius={'lg'}
      >
        <Box
          w="full"
          bg="yellow.500"
          p="4"
          css={{ borderRadius: '8px 8px 0 0 ' }}
        >
          <Text color="black">Payment Success</Text>
        </Box>

        <Box p="4">
          <VStack textAlign={'center'} px="8" mt="4" spacing={'4'}>
            <Text>
              Congratulation you are a pro member , You have access to premuim
            </Text>
            <Heading size={'4xl'}>
              <RiCheckboxCircleFill />
            </Heading>
          </VStack>
        </Box>

        <Link to="/profle">
          {' '}
          <Button variant={'ghost'}> Got to Profile</Button>
        </Link>
        <Heading size={'xs'}> Reference : Go to the course</Heading>
      </VStack>
    </Container>
  );
};

export default PaymentSuccess;
