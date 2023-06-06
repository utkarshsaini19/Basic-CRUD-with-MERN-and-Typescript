import React, { useState } from 'react'
import { Formik,Form } from 'formik'
import { Grid, Stack,Heading, useToast } from '@chakra-ui/react';
import { InputControl,SubmitButton } from 'formik-chakra-ui';
import { useSigninUserMutation } from '../../store/api/authApi';
import { error } from 'console';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { setUser } from '../../store/state/authSlice';

const SignIn = () => {
  const [email,setEmail] = useState<string>()
  const toast = useToast() 
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [signinUser,{data,isLoading,error,isError,isSuccess}] = useSigninUserMutation();
  if(isError)
  {
    toast({title:(error as any).data.message,duration:3000,status:'error'})
    navigate('/send-verify-mail',{
      state : {email}
    })

  }

  console.log(isSuccess);
  console.log(data);
  
  
  if(isSuccess)
  {
    dispatch(setUser({token:data.token,name:data.username}))
    localStorage.setItem("token", data.token);
    navigate('/')
  }
  
  
  return (
    <Formik initialValues={{email:"",password:""}}
    
    onSubmit={(values)=>{
      setEmail(values.email)
      signinUser({...values})
      
    }}
    >
      <Form>
        <Grid h="90vh" placeItems="center">
          <Stack p='4' boxShadow='xl' borderRadius='md'>
            <Heading textAlign={'center'}>SignIn</Heading>
            <InputControl 
              name="email"
              label="Email"
              inputProps={{
                type: "email",
                placeholder: "Enter Email ..."
              }}
            />
            <InputControl 
              name="password"
              label="Password"
              inputProps={{
                type: "password",
                placeholder: "Enter Password ..."
              }}
            />
            <SubmitButton isLoading={isLoading}>Signin</SubmitButton>
          </Stack>

        </Grid>
      </Form>
    </Formik>
  )
}

export default SignIn