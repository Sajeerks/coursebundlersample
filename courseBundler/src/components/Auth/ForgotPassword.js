import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordAction } from '../../redux/actions/profileActions'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const {loading, error, message} = useSelector(state=>state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const forgotPasswordSubmitHandler =(e)=>{
      e.preventDefault()
      console.log("snedn mail formsunmmited");
      dispatch(forgotPasswordAction(email))
      // navigate("/login")
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
    <Container py={"16"} h="90vh">
        <form onSubmit={forgotPasswordSubmitHandler}>
            <Heading children="Forgot password" my="16" textTransform={"uppecase"} textAlign={["center", "left"]}/>

            <VStack spacing={'8'}>
                < Input
                 required
                 id="email"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                 placeholder='abc@gmail.com'
                 type={"email"}
                 focusBorderColor='yellow.500'
                 
                />
    <Button type="submit" w={"full"} colorScheme='yellow' isLoading={loading}> Send Reset Link</Button>
            </VStack>
        </form>

    </Container>
  )
}

export default ForgotPassword