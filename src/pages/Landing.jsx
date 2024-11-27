import { Link } from "react-router-dom";
import "../CSS/style.css";
import { Foot } from "../components/Foot";
export const Landing = () => {
  return (
    <div className="w-full h-screen bg-black flex flex-col justify-center items-center">
      <div className="w-4/12 h-96 rounded-md flex gap-1 flex-col items-center">
        <h1 className="text-5xl flex gap-3 text-center gfont text-[#373737]">
          <p className="text-[#ff6352]">Peer</p> Connect
        </h1>
        <div className="w-full h-1/3 flex justify-center items-center gap-3">
          <Link
            to="/signup"
            className="px-6 gfont py-3 w-1/3  text-center bg-[#1E1E1E] text-white rounded-lg shadow-md hover:bg-[#373737] transition duration-300"
          >
            Signup
          </Link>
          <Link
            to="/login"
            className="px-6 gfont py-3 w-1/3 text-center bg-[#1E1E1E] text-white rounded-lg shadow-md hover:bg-[#373737] transition duration-300"
          >
            Login
          </Link>
          <Link
            to="https://github.com/pandarudra/PeerConnect-Frontend"
            className="px-6 gfont py-3 w-1/3 text-center bg-[#1E1E1E] text-white rounded-lg shadow-md hover:bg-[#373737] transition duration-300"
          >
            Fork
          </Link>
        </div>
        <div className="w-full h-36 border-2 border-[#373737] flex flex-col justify-center items-center gap-3">
          <h3 className="text-xl gfont text-[#373737]">
            Try Peer Connect Meet for free
          </h3>
          <Link className="px-6 gfont w-64 py-3 text-center bg-[#1E1E1E] text-white rounded-lg shadow-md hover:bg-[#373737] transition duration-300">
            Start Meet
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0">
        <Foot />
      </div>
    </div>
  );
};
