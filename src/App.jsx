// src/App.jsx
import { Routes, Route } from "react-router-dom";
import "./index.css";
import { useTheme } from "./contexts/ThemeContext";
import { useLocation } from "react-router-dom";
import Landing from "./pages/landing";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./components/Auth";
import Errors from "./pages/errors/errors";
import Modale3 from "./components/Modale3"
import Support from "./pages/Support";
import Maps from "./pages/maps";
import MapPage from "./pages/maps/index";
import Footer from "./pages/landing/partials/footer";
import ModalProfile from './components/ModalProfile'
function App() {
  const { dark } = useTheme();
  const location = useLocation();

  const showFooterOn = ["/about", "/support"];
  const shouldShowFotter = showFooterOn.includes(location.pathname);

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
          <Route path="/"        element={<Landing />} />
          <Route path="/signup"  element={<Auth />} /> 
          <Route path="/signin"  element={<Auth />} />
          <Route path="/home"    element={<Home />} />
          <Route path="/about"   element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/maps"    element={<Maps />} />
          <Route path="/map"     element={<MapPage />} />
          <Route path="*"        element={<Errors />} />
          <Route path="/ModalProfile" element={<ModalProfile/>}/>
        </Routes>

        {shouldShowFotter && <Footer />}
      </div>
    </>
  );
}

export default App
