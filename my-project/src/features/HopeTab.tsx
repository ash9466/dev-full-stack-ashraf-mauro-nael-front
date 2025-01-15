import * as XLSX from "xlsx";
import React, { useState, useEffect } from "react";
import { useUser } from "@/auth/services/UserContext";
import { useNavigate } from "react-router-dom";

export function HopeTab() {
  const [hopeData, setHopeData] = useState([]);
  const [newRequest, setNewRequest] = useState("");
  const [feedback, setFeedback] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchHopeDataFromExcel = async () => {
    try {
      const response = await fetch("/HOPE_Excel.xlsx"); 
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]]; 
      const jsonData = XLSX.utils.sheet_to_json(sheet); 
      setHopeData(jsonData); 
    } catch (error) {
      console.error("Erreur lors de la lecture du fichier Excel :", error);
    }
  };

  useEffect(() => {
    fetchHopeDataFromExcel();
  }, []);

  const navigateToHopeDetail = (hope) => {
    navigate(`/hope/${hope.id}`, { state: { hope } });
  };

  const handleAddElement = () => {
    if (newRequest.trim()) {
      setHopeData([
        ...hopeData,
        { "Description détaillée": newRequest, Accès: "Disponible", Lien: "#" },
      ]);
      setNewRequest("");
    }
  };

  const handleRequestAddition = () => {
    alert("Demande envoyée pour validation !");
    setNewRequest("");
  };

  const handleRemoveElement = (index) => {
    const updatedData = hopeData.filter((_, i) => i !== index);
    setHopeData(updatedData);
  };

  const handleAddFeedback = (index, newFeedback) => {
    if (!newFeedback.trim()) return;
    const updatedData = [...hopeData];
    if (!updatedData[index].feedbacks) updatedData[index].feedbacks = [];
    if (updatedData[index].feedbacks.length < 3) {
      updatedData[index].feedbacks.push(newFeedback);
      setHopeData(updatedData);
    } else {
      alert("Limite de feedbacks atteinte.");
    }
  };

  const handleEditField = (index, field, value) => {
    const updatedData = [...hopeData];
    updatedData[index][field] = value;
    setHopeData(updatedData);
  };

  const filteredData = hopeData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  useEffect(() => {
    fetchHopeDataFromExcel();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tableau HOPE</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher..."
          className="border p-2 w-full rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 p-4 text-left text-sm font-bold text-gray-700 w-3/5">
              Description détaillée
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-bold text-gray-700 relative">
              Accès
            </th>
            <th className="border border-gray-300 p-4 text-left text-sm font-bold text-gray-700 relative">
              Détails
            </th>
            {user?.role === "ADMIN" && (
              <th className="border border-gray-300 p-4 text-left text-sm font-bold text-gray-700">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
  {filteredData.length > 0 ? (
    filteredData.map((data, index) => (
      <tr key={index} className={`odd:bg-white even:bg-gray-50`}>
        <td className="border border-gray-300 p-4 text-sm text-gray-700 leading-relaxed">
          {data["Description détaillée"] || "N/A"}
        </td>
        <td className="border border-gray-300 p-4 text-sm text-gray-700 leading-relaxed flex items-center justify-between">
          <span className="flex-1">{data["Accès"] || "N/A"}</span>
          <a
            href={data["Lien"]}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Accéder
          </a>
        </td>
        {user?.role === "ADMIN" && (
          <td className="border border-gray-300 p-4 text-sm text-gray-700 leading-relaxed">
            <button
              className="text-red-500 hover:underline"
              onClick={() => handleRemoveElement(index)}
            >
              Supprimer
            </button>
          </td>
        )}
        <td className="border border-gray-300 p-4 text-sm text-gray-700 leading-relaxed">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={() => navigateToHopeDetail(data)} 
          >
            Détails
          </button>
        </td>
      </tr>
    ))
    ) : (
      <tr>
        <td
          colSpan={user?.role === "ADMIN" ? 4 : 3}
          className="border border
  jsx
  Copier
  Modifier
          border-gray-300 p-6 text-center text-sm text-gray-500"
        >
          Aucun résultat trouvé...
        </td>
      </tr>
    )}
</tbody>
      </table>

      <div className="mt-6">
        {user?.role === "ADMIN" && (
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Ajouter un élément"
              className="border p-2 rounded"
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
            />
            <button
              onClick={handleAddElement}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Ajouter
            </button>
          </div>
        )}
        {["TEACHER", "STUDENT"].includes(user?.role) && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Demander un ajout"
              className="border p-2 rounded"
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
            />
            <button
              onClick={handleRequestAddition}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Demander
            </button>
          </div>
        )}
      </div>
    </div>
  );
}