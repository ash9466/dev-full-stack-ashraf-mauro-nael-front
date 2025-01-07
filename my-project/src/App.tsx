import React from 'react';
import './App.css';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import Header from './components/Header'
import AppRoutes from './AppRoutes';

function App() {
  return (
      <div>
        <AppRoutes/>
      </div>
  );
}

export default App;
