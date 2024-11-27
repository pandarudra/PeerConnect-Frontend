import { Link } from "react-router-dom";

export const Foot = () => {
  return (
    <div className="w-full h-16 border-t-2 bottom-0 flex justify-center items-center fixed text-center">
      <p className="gfont text-[#8e8c8c] "> Source code on </p>
      <Link
        className="text-[#ff6352] px-1 underline"
        to="https://github.com/pandarudra/PeerConnect-Frontend"
      >
        GitHub
      </Link>
      <p className="gfont text-[#8e8c8c]">. Please do Contribute</p>
    </div>
  );
};
