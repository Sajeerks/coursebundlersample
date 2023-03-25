import {
    Avatar,
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
import { registerAction } from '../../redux/actions/userActions';




  export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    border: 'none',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
  };
  
  const fileUploadStyle = {
    '&::file-selector-button': fileUploadCss,
  };
  
  const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState('');
    const dispatch  = useDispatch()

    const changeImageHandler = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
          setImagePrev(reader.result);
          setImage(file);
        };
      };

const registerSubmitHandler =(e)=>{
e.preventDefault()
const myform = new FormData()
  myform.append("name" , name)
  myform.append("email" , email)
  myform.append("password" , password)
  myform.append("file" , image)


  dispatch(registerAction(myform))

}
    return (
      <Container h={'95vh'}>
        <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
          <Heading children={'Registration'}  textTransform={"uppercase"}/>
  
          <form style={{ width: '100%' }} onSubmit={registerSubmitHandler}>
            <Box my="4" display={"flex"} justifyContent={"center"}>
            <Avatar size={"2xl"} src={imagePrev}/>

            </Box>
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
            

            <Box my={'4'}>
            <FormLabel htmlFor="chooseAvatar" children="Choose Avatar" />
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              type={'file'}
              focusBorderColor="yellow.500"
              css={fileUploadStyle}
              onChange={changeImageHandler}
            />
          </Box>
  </Box>
  
 
  
            <Button my="4" colorScheme={"yellow"} type="submit">REGISTER</Button>
  
            <Box>
            Already a User ? <Link to="/login"> <Button variant={"link"} colorScheme={"yellow"}> Sign in</Button>{"  "} Here</Link>

          </Box>  
          </form>
     
        </VStack>
      </Container>
    );
  };
  
  export default Register;
  