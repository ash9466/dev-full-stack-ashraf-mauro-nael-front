import React,{ useState } from "react";
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUser } from './services/UserContext';
import axios from "axios";

type FormValues = {
  email: string;
  password: string;
};

export function SignInForm() {

  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const [error, setError] = useState<string>("");

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  async function loginUser(credentials: { email: string; password: string; }) {
    const API_URL = "http://localhost:8080/api/authentication/authenticate";
    try {
      const response = await axios.post(API_URL, credentials);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response?.data || error.message);
      setError("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
      throw error;
    }
  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const credentials = {
        email: formValues.email,
        password: formValues.password,
      };
      const user = await loginUser(credentials);
      console.log(email);
      console.log(password);
      setUser(user); 
      navigate('/accueil');
    } catch (error) {
      setError("Nom d'utilisateur ou mot de passe incorrect.");
    }
  };

  return (
      <>
        <div className="justify-center items-center h-screen px-6 py-20 lg:px-8 shadow-2xl rounded-md" >
          <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 ml-12 text-center text-2xl/9 font-bold tracking-tight text-red-400">
              Se Connecter
            </h2>
            <img
              alt="Professor"
              src="/professor.svg"
              className="h-20 pl-1"
            />
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={submitForm} method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-red-400">
                  Email
                </label>
                <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 ${
                    error? "border-red-500 outline-red-500" : ""
                  }`}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-red-400">
                    Mot de passe
                  </label>
                  <div className="text-sm">
                    <Link to='/' className="font-semibold text-red-400 hover:text-red-600">
                      Compte non crée ? S'inscrire
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 ${
                    error? "border-red-500 outline-red-500" : ""
                  }`}
                />
                {error && (
                  <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <Link to='/accueil'></Link>
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    )
}

