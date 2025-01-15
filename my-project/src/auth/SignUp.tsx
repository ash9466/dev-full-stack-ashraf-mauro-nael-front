import React, { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type FormValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
};

const formSchema = z.object({
  email: z.string().email({
    message: "Votre adresse e-mail doit être valide.",
  }),
  password: z.string().min(8, {
    message: "Votre mot de passe doit comporter au moins 8 caractères.",
  }),
  firstName: z.string().min(1, {
    message: "Votre prénom doit comporter au moins 1 caractère.",
  }),
  lastName: z.string().min(1, {
    message: "Votre nom doit comporter au moins 1 caractère.",
  }),
  role: z.enum(["student", "teacher"], {
    message: "Veuillez choisir un rôle valide.",
  }),
});

export function SignUpForm() {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  async function signupUser(newUser: FormValues) {
    const API_URL = "http://localhost:8080/api/authentication/register";
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Une erreur est survenue lors de l'inscription");
      }

      const userData = await response.json();

      return userData;
    } catch (error: any) {
      console.error("Erreur dans la fonction signupUser:", error.message);
      throw error;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      formSchema.parse(formValues);

      setErrors({});

      const newUser = {
        email: formValues.email,
        password: formValues.password,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        role: formValues.role.toUpperCase(),
      };

      await signupUser(newUser);

      console.log("Inscription réussie !");
      navigate("/connexion", { state: { successMessage: "Inscription réussie !" } });
    } catch (err: any) {
      if (err.errors) {
        const errorMessages: { [key: string]: string } = {};
        err.errors.forEach((error: any) => {
          errorMessages[error.path[0]] = error.message;
        });
        setErrors(errorMessages);
      } else {
        console.error("Erreur lors de l'inscription :", err);
        setErrors({ server: "Échec de l'inscription, veuillez réessayer." });
      }
    }
  };

  return (
    <div className="justify-center items-center h-screen px-6 py-20 lg:px-8 shadow-2xl rounded-md">
      <div className="flex justify-center sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 ml-12 text-center text-2xl/9 font-bold tracking-tight text-red-400">
          S'inscrire
        </h2>
        <img alt="Professor" src="/professor.svg" className="h-20 pl-1" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-red-400">
              Adresse e-mail
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 ${
                  errors.email ? "border-red-500 outline-red-500" : ""
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-red-400">
              Mot de passe
            </label>
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
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="firstName" className="block text-sm/6 font-medium text-red-400">
              Prénom
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formValues.firstName}
                onChange={handleChange}
                required
                autoComplete="given-name"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 ${
                  errors.firstName ? "border-red-500 outline-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm/6 font-medium text-red-400">
              Nom
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formValues.lastName}
                onChange={handleChange}
                required
                autoComplete="family-name"
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 ${
                  errors.lastName ? "border-red-500 outline-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="role" className="block text-sm/6 font-medium text-red-400">
              Rôle
            </label>
            <div className="mt-2">
              <select
                id="role"
                name="role"
                value={formValues.role}
                onChange={handleChange}
                required
                className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6 ${
                  errors.role ? "border-red-500 outline-red-500" : ""
                }`}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
