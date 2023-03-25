import { Button, Container, Heading, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordAction } from '../../redux/actions/profileActions';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [show, setShow] = React.useState(false)
     const dispatch = useDispatch()
     const {loading, message, error} = useSelector(state =>state.profile)
     const navigate = useNavigate()

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updatePasswordAction(oldPassword,newPassword))
        navigate("/profile")
      };
      useEffect(() => {
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(message){
      toast.success(message)
      dispatch({type:"clearMessage"})
    }

      }, [error, message,dispatch])
      const handleClick = () => setShow(!show)
  return (
     <Container py="16" minH="90vh">
     <form onSubmit={submitHandler}>
            <Heading children="Change password"  textTransform={"uppercase"} my="16" textAlign={["center", "left"]}/>
            <VStack spacing={'8'}>
              <InputGroup>
          <Input
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old Password"
            // type={'password'}
            focusBorderColor="yellow.500"
            type={show ? 'text' : 'password'}
          />
          <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>

        </InputGroup>
    

         <InputGroup>
          <Input
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="new Password"
            // type={'password'}
            focusBorderColor="yellow.500"
            type={show ? 'text' : 'password'}
          />
          <InputRightElement width='4.5rem'>
        <Button h='1.75rem' size='sm' onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>

        </InputGroup>

          <Button
            w="full"
            colorScheme={'yellow'}
            type="submit"
            isLoading={loading}
          >
            Change
          </Button>
        </VStack>
        </form>

     </Container>

  )
}

export default ChangePassword