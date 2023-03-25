import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileAction } from '../../redux/actions/profileActions';
import { loadUserAction } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const dispatch = useDispatch()
    const {loading} = useSelector(state=>state.profile)
    const navigate = useNavigate()

    const submitHandler = async e => {
        e.preventDefault();

        await dispatch(updateProfileAction(name,email))
        await dispatch(loadUserAction())
        navigate("/profile")
    }
  return (
    <Container py="16" minH={'90vh'}>
    <form onSubmit={submitHandler}>
      <Heading
        textTransform={'uppercase'}
        children="Update Profile"
        my="16"
        textAlign={['center', 'left']}
      />

      <VStack spacing={'8'}>
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          type={'text'}
          focusBorderColor="yellow.500"
        />{' '}
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          type={'email'}
          focusBorderColor="yellow.500"
        />
        <Button
          w="full"
          colorScheme={'yellow'}
          type="submit"
          isLoading={loading}
        >
          Update
        </Button>
      </VStack>
    </form>
  </Container>
  )
}

export default UpdateProfile