import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PetRegistrationForm } from './features/pets/pages/PetRegistrationPage.tsx'
import { LoginPage } from './features/auth/pages/LoginPage.tsx'
import { RegistrationPage } from './features/auth/pages/RegistrationPage.tsx'
import { BrowserRouter , Routes, Route} from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path = "/registrar-mascota" element={<PetRegistrationForm />} />
      <Route path='/login-page' element = {<LoginPage />} />
      <Route path='/registration-page' element = {<RegistrationPage />} />
    </Routes>
  </BrowserRouter>,
)
