import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEnterOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

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
      navigate("/home"); // change if needed
    } else {
      alert("Wrong email or password");
    }
  };

  return (
    <div className="w-screen min-h-screen flex md:grid md:grid-cols-2">
      {/* Purple section */}
      <div className="hidden md:block bg-purple-800 w-full h-full"></div>

      {/* Form section */}
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 px-4 md:px-0">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Login</h1>
          <p>Welcome back! Please login to your account</p>
        </div>

        <div className="flex flex-col gap-5 w-full md:w-auto">
          {/* Email */}
          <div className="flex flex-col">
            <label>Email Address</label>
            <div className="relative">
              <MdOutlineMail className="absolute text-2xl top-2 left-2" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Your Email"
                className="border pl-8 w-full md:w-90 h-10 rounded-full"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label>Password</label>
            <div className="relative">
              <TbLockPassword className="absolute text-2xl top-2 left-2" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="border pl-8 w-full md:w-90 h-10 rounded-full"
              />
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={login}
            className="flex justify-center items-center gap-2 w-full md:w-90 h-13 bg-pink-600 text-white rounded-full"
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
