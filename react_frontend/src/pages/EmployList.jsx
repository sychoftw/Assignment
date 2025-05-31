import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACKEND_URL}/get-employes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(res.data.users);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${BACKEND_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refetch updated list
      fetchEmployees();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };
  const handleEdit = async (id) => {
    navigate(`/editEmploy/${id}`)
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {employees.map((emp) => (
        <div
          key={emp.id}
          className="flex items-center bg-white shadow-md rounded-lg p-6 w-full max-w-6xl mx-auto"
        >
          <img
            src={`${BACKEND_URL}/uploads/${emp.image}`}
            alt={emp.name}
            className="w-24 h-24 object-cover rounded-full mr-6 border"
          />

          <div className="grid grid-cols-6 gap-4 w-full items-center text-sm text-gray-800">
            <div className="col-span-1">
              <p className="font-semibold text-base">{emp.name}</p>
              <p className="text-gray-600 text-sm">{emp.email}</p>
            </div>

            <div className="col-span-1">
              <p className="text-sm">
                <span className="font-medium">Mobile:</span> {emp.mobileNo}
              </p>
            </div>

            <div className="col-span-1">
              <p className="text-sm">
                {emp.Designation} | {emp.Gender} | {emp.Course}
              </p>
            </div>

            <div className="col-span-1 text-xs text-gray-500">
              {new Date(emp.createdate).toLocaleString()}
            </div>

            <div className="col-span-1">
              <button
                onClick={()=>{
                  handleEdit(emp.id)
                }}
                type="button"
                className="text-white bg-black hover:bg-gray-700 rounded-lg text-sm px-4 py-2"
              >
                Edit
              </button>
            </div>

            <div className="col-span-1">
              <button
               onClick={() => {
                    if (window.confirm("Are you sure you want to delete this employee?")) {
                            handleDelete(emp.id);
                        }
                    }}

                type="button"
                className="text-white bg-red-600 hover:bg-red-700 rounded-lg text-sm px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
