import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 

  console.log("ID --------------",id)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: [],
  });

  const [image, setImage] = useState(null);

 
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${BACKEND_URL}/get-emplpoye/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("RESPONSE DATA -------------------",res.data.users.name)

        const data = res.data;

        setFormData({
          name: data.users.name || "",
          email: data.users.email || "",
          mobileNo: data.users.mobileNo || "",
          designation: data.users.designation || "",
          gender: data.users.gender || "",
          course: data.users.course ? data.users.course.split(",") : [],
        });

        setImage(null); 
      } catch (err) {
        alert("Failed to fetch employee data.");
        console.error(err);
      }
    };

    if (id) fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const updatedCourses = checked
        ? [...prev.course, value]
        : prev.course.filter((c) => c !== value);
      return { ...prev, course: updatedCourses };
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("mobileNo", formData.mobileNo);
    data.append("designation", formData.designation);
    data.append("gender", formData.gender);
    data.append("course", formData.course.join(","));

    if (image) {
      data.append("image", image);
    }

    try {
      const token = localStorage.getItem("token");
      if (id) {
        // Edit
        const res = await axios.put(`${BACKEND_URL}/edit/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert(res.data.message || "Employee updated successfully");
      } else {
        // Create
        if (!image) return alert("Please upload an image.");
        const res = await axios.post(`${BACKEND_URL}/create-employ`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        alert(res.data.message || "Employee created successfully");
      }

      navigate("/employlist");
    } catch (err) {
      alert(err.response?.data?.message || "Error saving employee");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">{id ? "Edit Employee" : "Create Employee"}</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobileNo"
          placeholder="Mobile Number"
          className="w-full p-2 border rounded"
          value={formData.mobileNo}
          onChange={handleChange}
          required
        />

        <select
          name="designation"
          className="w-full p-2 border rounded"
          value={formData.designation}
          onChange={handleChange}
          required
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="MANAGER">MANAGER</option>
          <option value="SALES">SALES</option>
        </select>

        <div className="space-y-1">
          <p className="font-medium">Gender</p>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              className="mr-2"
            />
            Male
          </label>
          <label className="inline-flex items-center ml-4">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              className="mr-2"
            />
            Female
          </label>
        </div>

        <div className="space-y-1">
          <p className="font-medium">Course</p>
          {["MCA", "BCA", "BSC"].map((course) => (
            <label key={course} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={course}
                checked={formData.course.includes(course)}
                onChange={handleCourseChange}
                className="mr-2"
              />
              {course}
            </label>
          ))}
        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
         
          required={!id}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
