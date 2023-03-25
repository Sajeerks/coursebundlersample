import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { resetPasswordAction } from '../../redux/actions/profileActions'
import { toast } from 'react-hot-toast'

const ResetPassword = () => {
    const [password, setPassword] = useState("")
    const params = useParams()
    const {loading, error, message} = useSelector(state=>state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const resetpasswordSubmithandler =(e)=>{
      e.preventDefault()
      console.log("snedn mail formsunmmited");
      dispatch(resetPasswordAction( params.token,  password))
    }
    useEffect(() => {
   if(error){
    toast.error(error)
    dispatch({type:"clearError"})
   }
   if(message){
    toast.success(message)
    dispatch({type:"clearMessage"})
      navigate("/login")

   }
    
    }, [error, message, dispatch])
    
  return (
    <Container py={"16"} h="90vh">
        <form onSubmit={resetpasswordSubmithandler}>
            <Heading children="ResetPassword " my="16" textTransform={"uppecase"} textAlign={["center", "left"]}/>

            <VStack spacing={'8'}>
                < Input
                 required
                 id="password"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                 placeholder='password'
                 type={"password"}
                 focusBorderColor='yellow.500'
                 
                />
    <Button type="submit" w={"full"} colorScheme='yellow' isLoading={loading}> RESET PASSWORD</Button>
            </VStack>
        </form>

    </Container>
  )
}

export default ResetPassword