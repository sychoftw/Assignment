import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col items-center space-y-6 bg-white p-8 rounded-lg ">
        <h1 className="text-2xl  text-gray-800">
          WELCOME TO ADMIN'S DASHBOARD
        </h1>

        <button
          onClick={() => navigate("/createEmploy")}
          type="button"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create Employee
        </button>
      </div>
    </div>
  );
}
