import "./index.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Departments from "./pages/departments";
import DepartmentDetails from "./pages/DepartmentDetails";



function App() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/departments/:id" element={<DepartmentDetails />} />

    </Routes>
  );
}

export default App;
