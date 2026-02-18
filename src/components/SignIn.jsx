import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEnterOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidecarou from "./sidecarou";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const storedUser = JSON.parse(localStorage.getItem("findmeUser"));

    if (!storedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      email === storedUser.email &&
      password === storedUser.password
    ) {
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div className="w-screen min-h-screen flex md:grid md:grid-cols-2">

      <div className="hidden md:block bg-purple-800 w-full h-full">
        <Sidecarou />
      </div>


      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 px-4 md:px-0">

        <div className=" space-y-3">
          <h1 className=" p-5 text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent">Login</h1>
          <p>Welcome back! Please login to your account</p>
        </div>

        <div className="flex flex-col gap-5 w-full md:w-auto">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label>Email Address :</label>
            <div className="relative">
              <MdOutlineMail className="absolute text-2xl top-2 left-2 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                className="border-2 border-gray-400 outline-0 pl-8 w-full md:w-90 h-10 rounded-full"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label>Password :</label>
            <div className="relative">
              <TbLockPassword className="absolute text-2xl top-2 left-2 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="border-2 border-gray-400 outline-0 pl-8 w-full md:w-90 h-10 rounded-full"
              />
            </div>
          </div>

          {/* Login button */}
          <button
            style={{ background: "var(--gradient-qriblik)" }}
            onClick={login}
            className="flex justify-center items-center gap-2 w-full md:w-90 h-13  text-white rounded-full"
          >
            Login
            <IoEnterOutline />
          </button>
        </div>

        {/* Footer link */}
        <div className="flex items-center gap-2">
          <p>Don’t have an account?</p>
          <Link to="/signup" className="text-blue-800">
            Sign up
          </Link>
        </div>

      </div>
    </div>
  );
}

export default SignIn;
