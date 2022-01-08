import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  //refactor with JWT
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? <Outlet /> : <Navigate to="/login" />;
}
