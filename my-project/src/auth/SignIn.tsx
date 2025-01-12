import React,{ useState } from "react";
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useUser } from './services/UserContext';

type FormValues = {
  username: string;
  password: string;
};

export function SignInForm() {

  const location = useLocation();
  const successMessage = location.state?.successMessage;

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    password: "",
  });


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });
  //     if (!response.ok) throw new Error('Connexion raté');
  //     const data = await response.json();
  //     setUser(data);
  //     localStorage.setItem('token', data.token);
  //   } catch (error) {
  //     console.error('Erreur de conenxion', error);
  //   }
  // };

  function handleSubmitForm(){
    
    const fakeApiResponse = {
      success: true,
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        role: 'ADMINISTRATOR',
      },
    };
  
    if(fakeApiResponse.success){
      setUser(fakeApiResponse.user);
      navigate('/accueil');
    }
    else{
      console.log('Connexion échouée !');
    }
  }

  return (
      <>
        <div className="justify-center items-center h-screen px-6 py-20 lg:px-8 bg-red-form shadow-2xl rounded-md" >
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
            <form onSubmit={handleSubmitForm} method="POST" className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm/6 font-medium text-red-400">
                  Nom d'utilisateur
                </label>
                <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formValues.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 ${
                    errors.username ? "border-red-500 outline-red-500" : ""
                  }`}
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
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
                    errors.password ? "border-red-500 outline-red-500" : ""
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
                {successMessage && (
                  <p className="mt-1 text-sm text-green-500">{successMessage}</p>
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
