// src/App.jsx
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { useTheme } from "./contexts/ThemeContext";
import { useLocation } from "react-router-dom";
import Landing from "./pages/landing";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Errors from "./pages/errors/errors";
import Support from "./pages/support";
import Maps from "./pages/maps";
import MapPage from "./pages/maps/index";

import Footer from "./pages/landing/partials/footer";

function App() {
  const { dark } = useTheme();
  const location = useLocation()

  const showFooterOn = ["/about" , "/support"]
  const shouldShowFotter = showFooterOn.includes(location.pathname)

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          background: dark ? "#0f0a1e" : "#ffffff",
          color: dark ? "#f5f0ff" : "#1a1410",
          transition: "background 0.5s ease, color 0.5s ease",
        }}
      >

      

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/maps" element={<Maps />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="*" element={<Errors />} />
      </Routes>

      {shouldShowFotter && <Footer />}
      </div>
    </>

  );
}

export default App;