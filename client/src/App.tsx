import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './features/pets/pages/LandingPage';
import { PetRegistrationForm } from './features/pets/pages/PetRegistrationPage';
import './App.css';

function App() {
  return (
    <LandingPage />
  );
}

export default App;