import { Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import "./index.css";
import Landing from "./pages/landing";
=======
import "./index.css"; 
import Landing from "./pages/landing/index";
>>>>>>> afc645e326cbaa7fed311e9c30da0c2c83124f42
import Home from "./pages/Home";
import About from "./pages/About"; 
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Errors from "./pages/errors/errors";
<<<<<<< HEAD
=======
import Support from "./pages/Support";
import MapPage from "./pages/maps/index";

>>>>>>> afc645e326cbaa7fed311e9c30da0c2c83124f42
function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/support" element={<Support/>} />
      <Route path="/map" element={<MapPage />} />
      <Route path="*" element={<Errors />} />
    </Routes>
  );
  
}

export default App;