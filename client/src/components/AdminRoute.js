import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  //refactor with JWT
  const user = JSON.parse(localStorage.getItem("user"));

  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
