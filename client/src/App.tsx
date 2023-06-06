import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import Error404 from './pages/Error404/Error404'
import SendEmail from './pages/SendEmail/SendEmail'
import EmailVerify from './pages/EmailVerify/EmailVerify'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path="/send-verify-mail" element={<SendEmail />} />
        <Route path="/email-verify/:token" element={<EmailVerify />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App