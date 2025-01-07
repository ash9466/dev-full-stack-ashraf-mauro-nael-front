import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignInForm } from './components/SignInForm';
import { SignUpForm } from './components/SignUpForm';
import Header from './components/Header';

const AppRoutes = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    const handleLogout = () => {
        setIsAuthenticated(false); 
    };

    return (
        <Router> 
            <Routes>
                <Route path="/" element={<SignUpForm />} />
                <Route path="/connexion" element={<SignInForm />} />
                <Route
                path="/accueil"
                element={isAuthenticated ? <Header onLogOut={handleLogout} /> : <Navigate to="/connexion" />}
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
