import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div className="flex items-center justify-between  p-4 pb-4">
    <div className="flex items-center gap-10">
      <Link to={"/"}>
        <div className="italic font-extrabold text-4xl text-gray-300">
          <span className="text-purple-400">Chat</span>dApp
        </div>
      </Link>
    </div>
    <div className="flex items-center gap-3">
    <Link to={"/chat"}>
        <p className=" text-gray-300 py-2 px-7 text-md hover:bg-purple-600 border border-purple-400 transition duration-200 rounded-full font-bold bg-purple-700">Chat</p>
      </Link>
    <w3m-button />
    </div>
  </div>
  );
}

 