import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usercontroll } from "../redux/data";

const Log_in = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const submit = () => {
    dispatch(usercontroll(user, "log-in"));
    setUser({ email: "", password: "" });
    navigate("/");
  };
  return (
    <div className=" bg-black opacity-80 py-[25vh]  h-[100vh]">
      <div className="bg-gray-300 flex flex-col  mx-[30%]  rounded-xl p-6">
        <h1 className="text-center font-black text-2xl py-3 uppercase">
          log-in
        </h1>
        <span>
          email:
          <input
            type="email"
            className="my-3 w-3/4 ml-2"
            onChange={(e) => setUser((p) => ({ ...p, email: e.target.value }))}
            value={user.email}
          />
        </span>
        <span>
          password:
          <input
            type="password"
            className="my-3 w-3/4 ml-2"
            onChange={(e) =>
              setUser((p) => ({ ...p, password: e.target.value }))
            }
            value={user.password}
          />
        </span>
        <div className="flex flex-row ">
          <button
            className="basis-1/2 bg-blue-700 rounded-2xl mx-3 h-8 text-center pt-1"
            onClick={submit}
          >
            submit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="basis-1/2 text-red-900 bg-red-200 rounded-xl mx-3 h-8 text-center pt-1"
          >
            cancel
          </button>
        </div>
        <span>
          don't have an account ?
          <button
            onClick={() => navigate("/sign-up")}
            className="underline text-blue-700 ml-2"
          >
            sign-up
          </button>
        </span>
      </div>
    </div>
  );
};
export default Log_in;
