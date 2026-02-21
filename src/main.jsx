// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
<<<<<<< HEAD
import App from "./App"

=======
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
>>>>>>> 12b3c5bdc6ae81e6be9fa499ac5e1e7691ed1430

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)