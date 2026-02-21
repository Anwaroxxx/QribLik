import { Routes, Route } from "react-router-dom";
import "./index.css"; 
import Landing from "./pages/landing";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Errors from "./pages/errors/errors";
import Support from "./pages/support";
{/* test modal */}
import ModalProfile from "./components/ModalProfile";

import { useLocation } from "react-router-dom";
import Footer from "./pages/landing/partials/footer";

function App() {
  
  const location = useLocation()
  const showFooterOn = ["/home" , "/about" , "/support"]
  const shouldShowFotter = showFooterOn.includes(location.pathname)

  return (
<>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/support" element={<Support/>} />
      {/* test modal */}
      <Route path="/ModalProfile" element={<ModalProfile/>} />
      <Route path="*" element={<Errors />} />
    </Routes>

    { shouldShowFotter && <Footer/> }
</>

  );
}

export default App
