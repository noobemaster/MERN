import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const Sign = ({ login }) => {
  return (
    <div className=" bg-black opacity-80 py-[25vh]  h-[100vh]">
      <div className="bg-gray-300 flex flex-col  mx-[30%]  rounded-xl p-6">
        <h1 className="text-center font-black text-2xl py-3">sign-in</h1>
        <span>
          Name:
          <input type="text" className="my-3 w-3/4 ml-2" />
        </span>
        <span>
          password:
          <input type="password" className="my-3 w-3/4 ml-2" />
        </span>
        <div className="flex flex-row ">
          <Link
            to="/"
            className="basis-1/2 bg-blue-700 rounded-2xl mx-3 h-8 text-center pt-1"
            onClick={() => login(true)}
          >
            submit
          </Link>
          <Link
            to="/"
            className="basis-1/2 text-red-900 bg-red-200 rounded-xl mx-3 h-8 text-center pt-1"
          >
            cancel
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Sign;
