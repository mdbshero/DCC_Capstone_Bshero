// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePageUser from "./pages/HomePage/HomePageUser";
import LoginPageUser from "./pages/LoginPage/LoginPageUser";
import RegisterPageUser from "./pages/RegisterPage/RegisterPageUser";
import RegisterPageAgency from "./pages/RegisterPage/RegisterPageAgency"
import LoginPageAgency from "./pages/LoginPage/LoginPageAgency";
import HomePageAgency from "./pages/HomePage/HomePageAgency";
import ProfileUser from "./pages/ProfilePage/ProfilePageUser";
import VerPageUser from "./pages/VerPage/VerPageUser"
import VerPageAgency from "./pages/VerPage/VerPageAgency"
import LandingPage from "./pages/LandingPage/LandingPage"

// Component Imports
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import VerFormUser from "./components/VerificationForm/VerificationForm";
import ProfileAgency from "./pages/ProfilePage/ProfilePageAgency";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/homeUser"
          element={
            <PrivateRoute>
              <HomePageUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/homeAgency"
          element={
            <PrivateRoute>
              <HomePageAgency />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/registerUser" element={<RegisterPageUser />} />
        <Route path="/registerAgency" element={<RegisterPageAgency />} />
        <Route path="/loginUser" element={<LoginPageUser />} />
        <Route path="/loginAgency" element={<LoginPageAgency />} />
        <Route path="/profileUser" element={<ProfileUser />} />
        <Route path="/profileAgency" element={<ProfileAgency />} />
        <Route path="/verUser" element={<VerFormUser />} />
        <Route path="/agenciesUser" element={<VerPageUser />} />
        <Route path="/usersAgency" element={<VerPageAgency />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
