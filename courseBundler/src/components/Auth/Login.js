import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginAction } from '../../redux/actions/userActions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()

  const submitHandler =(e)=>{
   e.preventDefault()
    
   dispatch(loginAction(email, password))
  }

  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children={'Welcome to CourseBundler'} />

        <form style={{ width: '100%' }} onSubmit={submitHandler}>
          <Box my={'4'}>
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
              <FormLabel htmlFor="password" children="PASSWORD" />

            <Input
              required
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="enter ur password"
              type={'password'}
              focusBorderColor="yellow.500"
            />
          </Box>

          <Box>
            <Link to="/forgotpassword">
              <Button fontSize={'sm'} variant={'link'}>
                {' '}
                Forgot Password
              </Button>
            </Link>
          </Box>

          <Button my="4" colorScheme={"yellow"} type="submit">Login</Button>

          <Box>
       New user ? <Link to="/register"> <Button variant={"link"} colorScheme={"yellow"}> Sign Up</Button>{"  "} Here</Link>

          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Login;
