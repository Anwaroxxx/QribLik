import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { IoEnterOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Sidecarou from "./sidecarou";

import { useState } from "react";
import zxcvbn from "zxcvbn";


function SignUp() {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const inppassword = (e) => { setPassword(e.target.value) }
    const inpname = (e) => { setName(e.target.value) }
    const inpemail = (e) => { setEmail(e.target.value) }

    const resultNumber = zxcvbn(password)
    const num = resultNumber.score * 100 / 4
    console.log(num);

    const pregresscolor = () => {
        switch (resultNumber.score) {
            case 0:
                return "#828282";
            case 1:
                return "#EA1111";
            case 2:
                return "#FFAD00";
            case 3:
                return "#9b1158";
            case 4:
                return "#00b500";
            default:
                return 'none';
        }
    }

    const checkname = name?.length >= 8
    const checkemail = email?.includes('@') && email?.includes('.')
    const checkpassword = /[^a-zA-Z0-9]/.test(password) && password?.length > 9;


    const sign = () => {


        if (checkname && checkemail && checkpassword) {
            const user = {
                name,
                email,
                password,
            };

            localStorage.setItem("findmeUser", JSON.stringify(user));


            navigate("/SignIn");


            setEmail("");
            setName("");
            setPassword("");

        }
    };



    return (
        <div className="w-screen min-h-screen flex md:grid md:grid-cols-2">
            <div className="hidden md:block bg-purple-800 w-full h-full">
                <Sidecarou/>
            </div>
            <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 px-4 md:px-0">



                <div className="flex flex-col gap-3 items-center">
                    <h1 className="  p-5 text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#8B3FDE] via-[#C837AB] to-[#FF6B35] bg-clip-text text-transparent">Sign up for free</h1> 
                    <p>let's sign up quickly to get started </p>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2  ">
                        <label htmlFor="">UserName :</label>
                        <div className="relative">
                            <FaRegUser className="absolute text-2xl top-2 left-2 text-gray-400 " />
                            <input value={name} onChange={inpname} type="text" placeholder="Your Name" className=" pl-8 w-full md:w-90 border-2 border-gray-400 outline-0  h-10 rounded-full " />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2  ">
                        <label htmlFor="">Email Address :</label>
                        <div className="relative">
                            <MdOutlineMail className="text-2xl absolute  top-2 left-2 text-gray-400 " />
                            <input value={email} onChange={inpemail} type="email" placeholder="Your Email" className="border-2 border-gray-400 outline-0 pl-8 w-full md:w-90 h-10 rounded-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="">Password :</label>
                        <div className="relative flex flex-col gap-5">
                            <TbLockPassword className="text-2xl absolute  top-2 left-2 text-gray-400 " />
                            <input value={password} onChange={inppassword} type="password" placeholder="Password" className="border-2 border-gray-400 outline-0 pl-8 w-full md:w-90 h-10 rounded-full" />
                            <div className="w-full md:w-90 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                        width: `${num}%`,
                                        backgroundColor: pregresscolor(),
                                    }}
                                ></div>
                            </div>

                        </div>
                    </div>

                    <div onClick={sign} className="  flex justify-center items-center gap-2 w-full md:w-[360px] h-[52px]  text-white rounded-full cursor-pointer " style={{ background: "var(--gradient-qriblik)" }}  >
                        <button  >Sign Up </button>
                        <IoEnterOutline />
                    </div>

                </div>
                <div>
                    <div className="flex items-center gap-2 ">
                        <p>Already Have Account?</p>
                        <Link to={"/SignIn"} className="text-blue-800">Sign in</Link>
                    </div>
                </div>

            </div>
        </div>
    );


}

export default SignUp;