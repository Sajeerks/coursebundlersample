import {
  Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [name, setName] = useState('');
  return (
    <Container h="92vh">
      <VStack h="full" justifyContent={'center'} spacing={"16"}>
        <Heading children=" Contact Us" />

        <form style={{width:"100%"}}>
          <Box my="4" display={'flex'} justifyContent={'center'}></Box>
          <Box my={'4'}>
            <FormLabel htmlFor="name" children="NAME" />

            <Input
              required
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="enter your name"
              type={'text'}
              focusBorderColor="yellow.500"
            />
            <FormLabel htmlFor="email" children="EMAIL ADDRESS" />

            <Input
              required
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type={'email'}
              focusBorderColor="yellow.500"
            />
            <FormLabel htmlFor="message" children="MESSAGE" />

            <Textarea
              required
              id="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="enter ur message"
              type={'text'}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Button my="4" colorScheme={'yellow'} type="submit">
            SEND MESSAGE
          </Button>

          <Box>
            Request for a course{' '}
            <Link to="/request">
              {' '}
              <Button variant={'link'} colorScheme={'yellow'}>
                {' '}
                Click here
              </Button>
              {'  '}{' '}
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Contact;
