import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function HopeDetail() {
  const location = useLocation();
  const hope = location.state?.data;

  const [feedbacks, setFeedbacks] = useState(hope?.feedbacks || []);
  const [newFeedback, setNewFeedback] = useState("");

  const handleAddFeedback = () => {
    if (feedbacks.length >= 5) {
      alert("Vous ne pouvez pas ajouter plus de 5 feedbacks.");
      return;
    }
    if (newFeedback.trim() === "") {
      alert("Le feedback ne peut pas être vide.");
      return;
    }

    setFeedbacks([...feedbacks, newFeedback.trim()]);
    setNewFeedback("");
  };

  if (!hope) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-xl font-bold">Aucun détail disponible</h2>
        <p className="text-gray-700">Aucune donnée n'a été fournie pour cet élément.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Détails de l'élément
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">{hope.name}</h2>
        <div className="space-y-4">
          {Object.entries(hope).map(([key, value], index) => (
            <div key={index} className="flex justify-between border-b pb-2">
              <span className="font-medium text-gray-800">{key}</span>
              <span className="text-gray-600">
                {Array.isArray(value)
                  ? value.join(", ")
                  : typeof value === "string" || typeof value === "number"
                  ? value
                  : "N/A"}
              </span>
            </div>
          ))}
        </div>

        {feedbacks && feedbacks.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Feedbacks</h3>
            <ul className="space-y-2">
              {feedbacks.map((feedback, index) => (
                <li key={index} className="bg-gray-100 p-4 rounded-md shadow-sm">
                  {feedback}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ajouter un feedback</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
              placeholder="Écrire un feedback..."
              className="flex-1 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddFeedback}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Ajouter
            </button>
          </div>
          {feedbacks.length >= 5 && (
            <p className="text-red-500 text-sm mt-2">Limite de 5 feedbacks atteinte.</p>
          )}
        </div>
      </div>
    </div>
  );
}
