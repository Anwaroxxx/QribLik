import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <Link to="/Signup"><button className="w-50 h-20 rounded-4xl bg-black text-amber-50">signup</button></Link>
            
        </div>
    );
}

export default Home;