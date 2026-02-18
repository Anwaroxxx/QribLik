import { Routes , Route } from 'react-router-dom'
import './index.css'
import About from './pages/About' 
import Home from './pages/Home' 
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import Landing from './pages/landing'
import Errors from './pages/errors/errors'
import Support from './pages/support'



function App() {

  return (
    <>
      <Routes>
        <Route path='/landing' element={<Landing/>}></Route>
        <Route path='*' element={<Errors/>} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/Support" element={<Support/>}/>
        <Route path="/Signup" element={<SignUp />}/>
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
