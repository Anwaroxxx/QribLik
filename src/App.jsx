import { Routes, Route } from "react-router-dom";
import "./index.css"; 
import Landing from "./pages/landing";
import Home from "./pages/Home";
import About from "./pages/About"; 
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Errors from "./pages/errors/errors";
import Support from "./pages/support";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/support" element={<Support/>} />
      <Route path="*" element={<Errors />} />
    </Routes>
  );
}

export default App;
