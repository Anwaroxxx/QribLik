import { Routes , Route } from 'react-router-dom'
import './index.css'
import About from './pages/About'
import Support from './pages/Support'
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/support" element={<Support />}/>
      </Routes>
    </>
  )
}

export default App
