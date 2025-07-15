import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ClaimHistory from './Components/ClaimHistory.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>} />
      <Route path='/history/:userId' element={<ClaimHistory/>} />
    </Routes>
   </BrowserRouter>
  </StrictMode>,
)
