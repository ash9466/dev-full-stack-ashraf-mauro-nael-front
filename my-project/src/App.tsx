import React from 'react';
import { SignUpForm } from './auth/SignUp';
import { SignInForm } from './auth/SignIn';
import Header from './components/Header'
import AppRoutes from './features/routes/AppRoutes';
import '@/styles/App.css';

function App() {
  return (
      <div>
        <AppRoutes/>
      </div>
  );
}

export default App;
