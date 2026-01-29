import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function DepartmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const fetchDepartment = async () => {
    try {
      const res = await api.get(`/department/${id}`);
      setDepartment(res.data);
    } catch (err) {
      console.error(err.response?.data);
      alert("Failed to load department");
    } 
  };
  useEffect(() => {
    fetchDepartment();
  }, [id]);

  if (!department) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
     <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Department Details</h2>

        <div className="space-y-2">
          <p>
            <span className="font-semibold">Name:</span>{" "}
            {department.department}
          </p>
          <p>
            <span className="font-semibold">Description:</span>{" "}
            {department.description}
          </p>
          <p className="text-sm text-gray-500">
            Created at:{" "}
            {new Date(department.createdAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Back
        </button>
      </div>
    </div>
  );
}
