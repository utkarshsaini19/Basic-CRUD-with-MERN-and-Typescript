import React from 'react'
import { Formik,Form } from 'formik'
import { Grid, Stack,Heading } from '@chakra-ui/react';
import { InputControl,SubmitButton } from 'formik-chakra-ui';
import { useSignupUserMutation } from '../../store/api/authApi';

const SignUp = () => {
  const [signupUser,{data,isLoading}] = useSignupUserMutation();
  console.log(data);
  
    return (
    <Formik initialValues={{name:"",email:"",password:""}}
    
    onSubmit={(values)=>{
      signupUser({...values})
      
    }}
    >
      <Form>
        <Grid h="90vh" placeItems="center">
          <Stack p='4' boxShadow='xl' borderRadius='md'>
            <Heading textAlign={'center'}>SignUp</Heading>
            <InputControl 
              name="name"
              label="Name"
              inputProps={{
                placeholder: "Enter Username ..."
              }}
            />
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
            <SubmitButton isLoading={isLoading}>SignUp</SubmitButton>
          </Stack>

        </Grid>
      </Form>
    </Formik>
  )
}

export default SignUp