import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className='App'>
      <Router>
        <Header />
          <div className="body">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        <Footer />
      </Router>
    </div>
  )
}

export default App;
