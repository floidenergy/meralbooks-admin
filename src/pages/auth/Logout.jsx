import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../store/features/user'

const Logout = () => {
  const dispatcher = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {

    axios.get('http://localhost:3001/Logout', {
      withCredentials: true,
      timeout: 5000
    })
    .then(result => {
      console.log(result);
      if (result.status === 200) {
        dispatcher(logout())
        navigate('/login')
      }
    }).catch(err => {
      dispatcher(logout())
      navigate('/login')
    })

  });

  return <p>redirection</p>
}

export default Logout