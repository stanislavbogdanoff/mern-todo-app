import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'

import '../App.css'
import Spinner from '../components/Spinner'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const { name, email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()
    const userData = {
      name,
      email,
      password
    }
    dispatch(register(userData))
    navigate('/')
  }

  if (isLoading) return <Spinner />

  return (
    <section className="reg-section">

      <h2>Register</h2>
      
      <form onSubmit={handleSubmit} className='reg-form'>

        <input 
          type="text"
          name='name'
          placeholder='name'
          value={name}
          onChange={handleChange}
        />

        <input 
          type="email"
          name='email'
          placeholder='email'
          value={email}
          onChange={handleChange}
        />

        <input 
          type="password"
          name='password'
          placeholder='password'
          value={password}
          onChange={handleChange}
        />

        <button type='submit'>Submit</button>

      </form>

    </section>

  )
}

export default Register