import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usercontroll } from "../redux/data";

const Sign_up = () => {
  const navigate = useNavigate();
  const initial = { email: "", password: "", telephone: "", name: "" };
  const [user, setUser] = useState(initial);
  const dispatch = useDispatch();
  const submit = async () => {
    dispatch(usercontroll(user, "sign-up"));
    setUser(initial);
    navigate("/");
  };
  return (
    <div className=" bg-black opacity-80 py-[25vh]  h-[100vh]">
      <div className="bg-gray-300 flex flex-col  mx-[30%]  rounded-xl p-6 capitalize">
        <h1 className="text-center font-black text-2xl py-3 uppercase">
          sign-up
        </h1>
        <span>
          user name:
          <input
            type="text"
            className="my-3 w-3/4 ml-2"
            onChange={(e) => setUser((p) => ({ ...p, name: e.target.value }))}
            value={user.name}
          />
        </span>
        <span>
          phone-number:
          <input
            type="number"
            className="my-3 w-3/4 ml-2"
            onChange={(e) =>
              setUser((p) => ({ ...p, telephone: e.target.value }))
            }
            value={user.telephone}
          />
        </span>
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
          Already have an account ?
          <button
            onClick={() => navigate("/log-in")}
            className="underline text-blue-700 ml-2"
          >
            log-in
          </button>
        </span>
      </div>
    </div>
  );
};
export default Sign_up;
