import { Grid, Heading, Spinner, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useSendMailFOrVerificationMutation } from '../../store/api/authApi'
import { useLocation } from 'react-router-dom'

const SendEmail = () => {
  const toast = useToast()
  const { state } = useLocation()
  const [sendMailFOrVerification, { data, isLoading, error, isError }] = useSendMailFOrVerificationMutation()

  console.log(data);
  console.log(state);


  if (isError) {
    toast({ title: (error as any).data.message, duration: 3000, status: 'error' });
  }

  useEffect(() => {
    console.log("Hello from useEffect");

    sendMailFOrVerification({ email: state.email })


  }, [])


  return (
    <>
      {
        isLoading ?
          <Grid placeItems="center" h="100vh">
            <Spinner />
          </Grid>
          : <Grid placeItems="center" h="100vh">
            <Heading>Email Sended</Heading>
          </Grid>
      }
    </>

  )
}

export default SendEmail