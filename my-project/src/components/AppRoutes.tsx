import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignInForm } from './Forms/SignInForm';
import { SignUpForm } from './Forms/SignUpForm';
import Header from './Header';

const AppRoutes = () => {

    return (
        <Router> 
            <Routes>
                <Route path="/" element={<SignUpForm />} />
                <Route path="/connexion" element={<SignInForm />} />
                <Route
                path="/accueil"
                element={<Header/>}
                />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
