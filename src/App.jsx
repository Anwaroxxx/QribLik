import { Routes , Route } from 'react-router-dom'
import './index.css'
import About from './pages/About'

import Home from './pages/Home'
import Support from './pages/support'



function App() {

  return (
    <>
      <Routes>
        
        <Route path="/about" element={<About/>} />
        <Route path="/Support" element={<Support/>}/>
      </Routes>
    </>
  )
}

export default App
