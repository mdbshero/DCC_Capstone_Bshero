// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPageUser from "./pages/LoginPage/LoginPageUser";
import RegisterPageUser from "./pages/RegisterPage/RegisterPageUser";
import RegisterPageAgency from "./pages/RegisterPage/RegisterPageAgency"
import LoginPageAgency from "./pages/LoginPage/LoginPageAgency";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/registerUser" element={<RegisterPageUser />} />
        <Route path="/registerAgency" element={<RegisterPageAgency />} />
        <Route path="/loginUser" element={<LoginPageUser />} />
        <Route path="/loginAgency" element={<LoginPageAgency />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
