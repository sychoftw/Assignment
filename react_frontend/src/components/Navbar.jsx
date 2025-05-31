import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if token exists in localStorage when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(token); // true if token exists
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">MyApp</div>

        <div className="hidden md:flex space-x-6">
          <Link to="/dashboard" className="hover:text-gray-300">Home</Link>
          <Link to="/employlist" className="hover:text-gray-300">Employees List</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Login</Link>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block hover:text-gray-300">Home</Link>
          <Link to="/employlist" onClick={() => setIsOpen(false)} className="block hover:text-gray-300">Employees List</Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block w-full text-left hover:text-gray-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block hover:text-gray-300">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
