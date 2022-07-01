import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, reset } from '../features/auth/authSlice'
import { LoginOutlined, LogoutOutlined, UserAddOutlined, CheckOutlined } from '@ant-design/icons'


const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <header className="header">
      <h1> <CheckOutlined style={{color: 'rgb(111, 255, 166)'}} /> Todo<font id='comp-font'>Tracker</font></h1>
      { user ? (
        <button 
          onClick={handleLogout}
        >
          <LogoutOutlined /> Logout
        </button>
      ) : (
        <span>
          <button 
            onClick={handleRegister}
          >
            <UserAddOutlined /> Register
          </button>
          /
          <button 
            onClick={handleLogin}
          >
            <LoginOutlined /> Login
          </button>
        </span>
      )}
    </header>
  )
}

export default Header