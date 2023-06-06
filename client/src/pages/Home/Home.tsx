import React from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { Button } from '@chakra-ui/react'
import { defaultState } from '../../store/state/authSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {name} = useAppSelector((state)=> state.auth)
  const token = localStorage.getItem('token')

  const handleClick = () => {
    localStorage.removeItem('token')
    dispatch(defaultState())
    navigate('/signin')
  }
  return (
    <>
    <div>Hello {name}</div>
    {token && <Button onClick={handleClick}>Logout</Button>}
    </>

  )
}

export default Home