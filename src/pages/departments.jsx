import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [deptName, setDeptName] = useState("");
  const [desc, setDesc] = useState("");

  const navigate = useNavigate();

  const fetchDepartments = async () => {
    const res = await api.get("/departments");
    setDepartments(res.data);
  };

  const addDepartment = async () => {
    await api.post("/add-department", {
      dept_name: deptName,
      description: desc,
    });
    setDeptName("");
    setDesc("");
    fetchDepartments();
  };

  const deleteDepartment = async (id) => {
    await api.delete(`/delete-department/${id}`);
    fetchDepartments();
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Departments</h2>

        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Dept name"
            value={deptName}
            onChange={(e) => setDeptName(e.target.value)}
          />
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            onClick={addDepartment}
            className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {departments.map((d) => (
            <li
              key={d._id}
              className="flex justify-between items-center border p-3 rounded"
            >
              <div>
                <p className="font-semibold">{d.department}</p>
                <p className="text-sm text-gray-600">{d.description}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/departments/${d._id}`)}
                  className="px-3 py-1 border rounded hover:bg-gray-100"
                >
                  View
                </button>
                <button
                  onClick={() => deleteDepartment(d._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
