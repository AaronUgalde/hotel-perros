import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import { LandingPage } from './features/pets/pages/LandingPage'
import { PetRegistrationForm } from './features/pets/pages/PetRegistrationPage'
import { LoginContainer } from './features/auth/pages/LoginContainer'
import RegistrationPage from './features/auth/pages/RegistrationPage'
import './App.css'
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/layout/Header'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />      
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/registrar-mascota" element={<ProtectedRoute><PetRegistrationForm /></ProtectedRoute>} />
          <Route path="/login-page" element={<LoginContainer />} />
          <Route path="/registration-page" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App