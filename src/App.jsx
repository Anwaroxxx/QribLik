import { Routes , Route } from 'react-router-dom'
import './index.css'
import About from './pages/About'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About/>} />
      </Routes>
    </>
  )
}

export default App
