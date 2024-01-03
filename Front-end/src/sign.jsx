import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { login, usercontroll } from "./slice";

const Sign = () => {
  const path = useLocation().pathname.split("/")[1];
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const submit = async () => {
    let user1;
    if (path === "sign-in") {
      await dispatch(usercontroll(user, path));
      user1 = JSON.parse(localStorage.getItem("user"));
      //dispatch(login(user1));
      dispatch(newtoken());
      //localStorage.removeItem("user");
    } else {
      dispatch(usercontroll(user, path)).then(() => {
        user1 = JSON.parse(localStorage.getItem("user"));

        console.log(user1);
        user1 && dispatch(login(user1));
        localStorage.removeItem("user");
      });
    }
    //setUser({ email: "", password: "" });
  };
  console.log();
  return (
    <div className=" bg-black opacity-80 py-[25vh]  h-[100vh]">
      <div className="bg-gray-300 flex flex-col  mx-[30%]  rounded-xl p-6">
        <h1 className="text-center font-black text-2xl py-3">{path}</h1>
        <span>
          {" "}
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
            //to="/"
            className="basis-1/2 bg-blue-700 rounded-2xl mx-3 h-8 text-center pt-1"
            onClick={submit}
          >
            submit
          </button>
          <Link
            to="/"
            className="basis-1/2 text-red-900 bg-red-200 rounded-xl mx-3 h-8 text-center pt-1"
          >
            cancel
          </Link>
        </div>
        <span>
          don't have an account?
          <Link to="/sign-in" className="underline text-blue-700 ml-2">
            sign-in
          </Link>
        </span>
      </div>
    </div>
  );
};
export default Sign;
