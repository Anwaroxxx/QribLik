import { Routes , Route } from 'react-router-dom'
import './index.css'
import About from './pages/About'

import Home from './pages/Home'
import Support from './pages/Support'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'



function App() {

  return (
    <>
      <Routes>
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
