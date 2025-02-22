import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../auth/services/UserContext';
import axios from 'axios';

const Header = () => {

  const { user, setUser } = useUser(); 
  const navigate = useNavigate();

  async function logOutUser() {
    const API_URL = "http://localhost:8080/api/authentication/logout";
    try {
      const response = await axios.post(API_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await logOutUser();
      setUser(null);
      navigate("/connexion"); 
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
    }
  };

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/connexion" onClick={handleLogOut} className="text-sm font-semibold text-gray-900">
              Se déconnecter <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              Bonjour {user.firstName || "Utilisateur"} {user.lastName || ""}!
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Vous êtes connecté en tant que <strong>{user.role || "Visiteur"}</strong>.
            </p>
          </div>

          <div className="mt-10 text-center">
            {user.role === 'ADMIN' && (
              <div>
                <h2 className="text-xl font-bold">Section Administrateur</h2>
              </div>
            )}
            {user.role === 'TEACHER' && (
              <div>
                <h2 className="text-xl font-bold">Section Enseignant</h2>
              </div>
            )}
            {user.role === 'STUDENT' && (
              <div>
                <h2 className="text-xl font-bold">Section Étudiant</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
