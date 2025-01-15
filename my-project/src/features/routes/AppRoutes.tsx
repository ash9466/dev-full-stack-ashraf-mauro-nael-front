import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { SignInForm } from '../../auth/SignIn';
import { SignUpForm } from '../../auth/SignUp';
import Home from '../pages/Home';
import ProductDetail from '@/features/pages/HopeDetail';

const AppRoutes = () => {

    return (
        <Router> 
            <Routes>
                <Route path="/" element={<SignUpForm />} />
                <Route path="/connexion" element={<SignInForm />} />
                <Route path="/accueil" element={<Home/>}/>
                <Route path="/hope/:id" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
