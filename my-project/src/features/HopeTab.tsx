import React, { useEffect, useState, FC } from "react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

interface HopeTabProps {
  onAddElement?: (description: string, access: string, link: string) => void;
  onRemoveElement?: (index: number) => void;
  onEditField?: (index: number, field: string, value: string) => void;
  allowAdd?: boolean;
  allowRemove?: boolean;
  allowEdit?: boolean;
}

export const HopeTab: FC<HopeTabProps> = ({
  onAddElement,
  onRemoveElement,
  onEditField,
  allowAdd = false,
  allowRemove = false,
  allowEdit = false,
}) => {
  const [hopeData, setHopeData] = useState<Array<any>>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCell, setEditingCell] = useState<{ row: number; field: string } | null>(null);
  const navigate = useNavigate();

  const [newElement, setNewElement] = useState({
    description: "",
    access: "",
    link: "",
  });

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

  const handleEditField = (index: number, field: string, value: string) => {
    const updatedData = [...hopeData];
    updatedData[index][field] = value;
    setHopeData(updatedData);
    if (onEditField) {
      onEditField(index, field, value);
    }
    setEditingCell(null); 
  };

  const handleRemoveElement = (index: number) => {
    const updatedData = hopeData.filter((_, i) => i !== index);
    setHopeData(updatedData);
  
    if (onRemoveElement) {
      onRemoveElement(index);
    }
  };
  
  const handleCellClick = (row: number, field: string) => {
    setEditingCell({ row, field });
  };

  const filteredData = hopeData.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <input
        type="text"
        placeholder="Rechercher..."
        className="border p-2 w-full rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <table className="min-w-full border-collapse border border-gray-200 rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 p-4 text-left text-sm font-semibold text-gray-700">
              Description
            </th>
            <th className="border border-gray-200 p-4 text-left text-sm font-semibold text-gray-700">
              Accès
            </th>
            <th className="border border-gray-200 p-4 text-left text-sm font-semibold text-gray-700">
              Actions
            </th>
            <th className="border border-gray-200 p-4 text-left text-sm font-semibold text-gray-700">
              Lien & Détails
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((data, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white even:bg-gray-50">
              <td
                className="border border-gray-200 p-4 text-sm text-gray-800"
                onClick={() => handleCellClick(rowIndex, "Description détaillée")}
              >
                {editingCell?.row === rowIndex && editingCell.field === "Description détaillée" ? (
                  <input
                    type="text"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={data["Description détaillée"] || ""}
                    onBlur={(e) =>
                      handleEditField(rowIndex, "Description détaillée", e.target.value)
                    }
                    onChange={(e) => {
                      const updatedData = [...hopeData];
                      updatedData[rowIndex]["Description détaillée"] = e.target.value;
                      setHopeData(updatedData);
                    }}
                  />
                ) : (
                  data["Description détaillée"] || "N/A"
                )}
              </td>

              <td
                className="border border-gray-200 p-4 text-sm text-gray-800"
                onClick={() => handleCellClick(rowIndex, "Accès")}
              >
                {editingCell?.row === rowIndex && editingCell.field === "Accès" ? (
                  <input
                    type="text"
                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={data["Accès"] || ""}
                    onBlur={(e) => handleEditField(rowIndex, "Accès", e.target.value)}
                    onChange={(e) => {
                      const updatedData = [...hopeData];
                      updatedData[rowIndex]["Accès"] = e.target.value;
                      setHopeData(updatedData);
                    }}
                  />
                ) : (
                  data["Accès"] || "N/A"
                )}
              </td>

              {/* Actions */}
              <td className="border border-gray-200 p-4">
                {allowRemove && (
                  <button
                  onClick={() => handleRemoveElement(rowIndex)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Supprimer
                  </button>
                )}
              </td>

              {/* Lien & Détails */}
              <td className="border border-gray-200 p-4">
                <div className="flex space-x-2">
                  <a
                    href={data["Lien"] || "#"}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Lien
                  </a>
                  <button
                    onClick={() => navigate(`/hope/${rowIndex}`, { state: { data } })}
                    className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Détails
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {allowAdd && (
        <div className="mt-6 border border-gray-200 p-4 rounded">
          <h3 className="text-lg font-semibold mb-4">Ajouter un nouveau hope</h3>
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newElement.description}
            onChange={(e) =>
              setNewElement({ ...newElement, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Accès"
            className="border p-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newElement.access}
            onChange={(e) =>
              setNewElement({ ...newElement, access: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Lien"
            className="border p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={newElement.link}
            onChange={(e) =>
              setNewElement({ ...newElement, link: e.target.value })
            }
          />
          <button
            onClick={() =>
              onAddElement &&
              onAddElement(
                newElement.description,
                newElement.access,
                newElement.link
              )
            }
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Ajouter
          </button>
        </div>
      )}
    </div>
  );
};
