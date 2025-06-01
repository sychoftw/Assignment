// src/Auth/OpenRoute.js
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);

  return token ? children : <Navigate to="/login" replace />;
}

export default OpenRoute;
