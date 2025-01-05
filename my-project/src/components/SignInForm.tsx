import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function SignInForm() {
  
    return (
        <>
          {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
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
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm/6 font-medium text-red-400">
                    Nom d'utilisateur
                  </label>
                  <div className="mt-2">
                    <input
                      id="username"
                      name="username"
                      type="username"
                      required
                      autoComplete="username"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-red-400">
                      Mot de passe
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-red-400 hover:text-red-600">
                        Compte non crée ? S'inscrire
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Se connecter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )
}
