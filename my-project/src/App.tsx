import React from 'react';
import { SignUpForm } from './auth/SignUp';
import { SignInForm } from './auth/SignIn';
import Header from './components/Header'
import AppRoutes from './features/routes/AppRoutes';
import '@/styles/App.css';
import { UserProvider } from './auth/services/UserContext';

function App() {
  return (
      <div>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </div>
  );
}

export default App;
