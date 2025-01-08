import React,{ useState } from "react";
import { z } from "zod"
import { useNavigate } from "react-router-dom";

type FormValues = {
  username: string;
  password: string;
};

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Votre nom d'utilisateur doit comporter au moins 2 caractères.",
  }),
  password: z.string().min(6, {
    message: "Votre Mot de passe doit comporter au moins 6 caractères.",
  }),
})

export function SignUpForm() {

  const [formValues, setFormValues] = useState<FormValues>({
      username: "",
      password: "",
    });
  
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      try {
        formSchema.parse(formValues);
        setErrors({});
        console.log("Inscription réussie :", formValues);
        navigate('/connexion', {state : { successMessage : "Inscription réussie !"}});
      } catch (err) {
        
        const errorMessages = {};
        err.errors.forEach((error) => {
          errorMessages[error.path[0]] = error.message;
        });
        setErrors(errorMessages);
      }
    };

    return (
        <>
          <div className="justify-center items-center h-screen px-6 py-20 lg:px-8 bg-red-form shadow-2xl rounded-md" >
            <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 ml-12 text-center text-2xl/9 font-bold tracking-tight text-red-400">
                S'inscrire
              </h2>
              <img
                alt="Professor"
                src="/professor.svg"
                className="h-20 pl-1"
              />
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form action="#" className="space-y-6">
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
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    S'inscrire
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )
}
