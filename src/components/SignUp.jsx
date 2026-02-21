import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEnterOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Sidecarou from "./sidecarou";
import { useState } from "react";
import zxcvbn from "zxcvbn";
import { useTheme } from "../contexts/ThemeContext";

function SignUp() {
    const { dark } = useTheme();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inppassword = (e) => setPassword(e.target.value);
    const inpname = (e) => setName(e.target.value);
    const inpemail = (e) => setEmail(e.target.value);

    const resultNumber = zxcvbn(password);
    const num = resultNumber.score * 100 / 4;

    const pregresscolor = () => {
        switch (resultNumber.score) {
            case 0: return "#828282";
            case 1: return "#EA1111";
            case 2: return "#FFAD00";
            case 3: return "#9b1158";
            case 4: return "#00b500";
            default: return 'none';
        }
    };

    const checkname = name?.length >= 8;
    const checkemail = email?.includes('@') && email?.includes('.');
    const checkpassword = /[^a-zA-Z0-9]/.test(password) && password?.length > 9;

    const sign = () => {
        if (checkname && checkemail && checkpassword) {
            const user = { name, email, password };
            localStorage.setItem("findmeUser", JSON.stringify(user));
            navigate("/SignIn");
            setEmail("");
            setName("");
            setPassword("");
        }
    };

    // ── shared input style ────────────────────────────────────────────────────
    const inputStyle = {
        paddingLeft: "2rem",
        width: "100%",
        height: "2.5rem",
        borderRadius: "9999px",
        outline: "none",
        border: dark ? "2px solid rgba(139,63,222,0.4)" : "2px solid #9ca3af",
        background: dark ? "rgba(255,255,255,0.05)" : "white",
        color: dark ? "#f5f0ff" : "#111827",
        transition: "border-color 0.3s, background 0.5s, color 0.5s",
    };

    const labelStyle = {
        color: dark ? "rgba(196,168,240,0.8)" : "#374151",
        transition: "color 0.5s",
        fontSize: "0.9rem",
        fontWeight: 500,
    };

    return (
        <div
            className="w-screen min-h-screen flex md:grid md:grid-cols-2 transition-colors duration-500"
            style={{ background: dark ? "#0f0a1e" : "#ffffff" }}
        >
            {/* Left side — carousel */}
            <div className="hidden md:block bg-purple-800 w-full h-full">
                <Sidecarou />
            </div>

            {/* Right side — form */}
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 px-4 md:px-0">

                {/* Header */}
                <div className="flex flex-col gap-3 items-center">
                    <h1 className="p-5 text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent">
                        Sign up for free
                    </h1>
                    <p
                        className="transition-colors duration-500"
                        style={{ color: dark ? "rgba(196,168,240,0.6)" : "#6b7280" }}
                    >
                        Let's sign up quickly to get started
                    </p>
                </div>

                {/* Form fields */}
                <div className="flex flex-col gap-5">

                    {/* Username */}
                    <div className="flex flex-col gap-2">
                        <label style={labelStyle}>UserName :</label>
                        <div className="relative">
                            <FaRegUser
                                className="absolute text-2xl top-2 left-2"
                                style={{ color: dark ? "rgba(196,168,240,0.5)" : "#9ca3af" }}
                            />
                            <input
                                value={name}
                                onChange={inpname}
                                type="text"
                                placeholder="Your Name"
                                style={inputStyle}
                                className="md:w-90 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label style={labelStyle}>Email Address :</label>
                        <div className="relative">
                            <MdOutlineMail
                                className="text-2xl absolute top-2 left-2"
                                style={{ color: dark ? "rgba(196,168,240,0.5)" : "#9ca3af" }}
                            />
                            <input
                                value={email}
                                onChange={inpemail}
                                type="email"
                                placeholder="Your Email"
                                style={inputStyle}
                                className="md:w-90 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label style={labelStyle}>Password :</label>
                        <div className="relative flex flex-col gap-5">
                            <TbLockPassword
                                className="text-2xl absolute top-2 left-2"
                                style={{ color: dark ? "rgba(196,168,240,0.5)" : "#9ca3af" }}
                            />
                            <input
                                value={password}
                                onChange={inppassword}
                                type="password"
                                placeholder="Password"
                                style={inputStyle}
                                className="md:w-90 placeholder:text-gray-400"
                            />

                            {/* Password strength bar */}
                            <div
                                className="w-full md:w-90 h-2 rounded-full overflow-hidden"
                                style={{ background: dark ? "rgba(255,255,255,0.1)" : "#e5e7eb" }}
                            >
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                        width: `${num}%`,
                                        backgroundColor: pregresscolor(),
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sign Up button */}
                    <div
                        onClick={sign}
                        className="flex justify-center items-center gap-2 w-full md:w-[360px] h-[52px] text-white rounded-full cursor-pointer hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300"
                        style={{
                            background: "linear-gradient(135deg, #8B3FDE 0%, #C837AB 50%, #FF6B35 100%)",
                            boxShadow: dark
                                ? "0 8px 28px rgba(139,63,222,0.45)"
                                : "0 8px 24px rgba(200,55,171,0.3)",
                        }}
                    >
                        <button className="font-semibold">Sign Up</button>
                        <IoEnterOutline />
                    </div>
                </div>

                {/* Bottom link */}
                <div className="flex items-center gap-2">
                    <p
                        className="transition-colors duration-500"
                        style={{ color: dark ? "rgba(196,168,240,0.6)" : "#6b7280" }}
                    >
                        Already Have Account?
                    </p>
                    <Link
                        to="/SignIn"
                        className="font-semibold transition-colors duration-300"
                        style={{ color: dark ? "#c084fc" : "#1d4ed8" }}
                    >
                        Sign in
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default SignUp;