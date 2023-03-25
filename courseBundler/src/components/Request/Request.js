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
  
  const Request = () => {
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
  
    const [name, setName] = useState('');
    return (
      <Container h="92vh">
        <VStack h="full" justifyContent={'center'} spacing={"16"}>
          <Heading children=" Request Course" />
  
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
              <FormLabel htmlFor="course" children="Course" />
  
              <Textarea
                required
                id="message"
                value={course}
                onChange={e => setCourse(e.target.value)}
                placeholder="explain the course"
                type={'text'}
                focusBorderColor="yellow.500"
              />
            </Box>
  
            <Button my="4" colorScheme={'yellow'} type="submit">
              SEND Request
            </Button>
  
            <Box>
              See avaliable Courses{' '}
              <Link to="/courses">
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
  
  export default Request;
  