import { Grid, Heading, Spinner, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useVerifyUserMutation } from '../../store/api/authApi';

const EmailVerify = () => {
  const { token } = useParams();
  const toast = useToast()
  console.log(token);

  const [verifyUser, { data, isError, error, isLoading }] = useVerifyUserMutation();

  if (isError) {
    toast({ title: (error as any).data.message, duration: 3000, status: 'error' })

  }
  console.log(data);
  

  useEffect(() => {
    if (token) {
      verifyUser({ token })
    }
  }, [token])


  return (

    <>
      {
        isLoading ?
          <Grid placeItems="center" h="100vh">
            <Spinner />
          </Grid>

          :
          <>
            {
              isError && <Grid placeItems="center" h="100vh">
                <Heading>Invalid Token !</Heading>
              </Grid>
            }
            {
              data && <Grid placeItems="center" h="100vh">
                <Heading>Your Email has been verified SuccessFully!</Heading>
              </Grid>

            }

          </>
      }
    </>



  )
}

export default EmailVerify