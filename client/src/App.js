import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookingCar from "./pages/BookingCar";
import "antd/dist/antd.css";
import ProtectedRoute from "./components/ProtectedRoute";
import UserBookings from "./pages/UserBookings";
import AddCar from "./pages/AddCar";
import AdminHome from "./pages/AdminHome";
import EditCar from "./pages/EditCar";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking/:carId" element={<ProtectedRoute />}>
            <Route path="/booking/:carId" element={<BookingCar />} />
          </Route>
          <Route path="/userbookings" element={<ProtectedRoute />}>
            <Route path="/userbookings" element={<UserBookings />} />
          </Route>
          <Route path="/addcar" element={<AdminRoute />}>
            <Route path="/addcar" element={<AddCar />} />
          </Route>
          <Route path="/editcar/:carId" element={<AdminRoute />}>
            <Route path="/editcar/:carId" element={<EditCar />} />
          </Route>
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="/admin" element={<AdminHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//refactor with JWT
// export const ProtectedRoute = (props) => {
//   const navigate = useNavigate();
//   if (localStorage.getItem("user")) {
//     return <Route {...props} />;
//   } else {
//     return navigate("/login");
//     // return <Login />;
//   }
// };
