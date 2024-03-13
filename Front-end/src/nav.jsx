import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../public/hse.jfif";
import { logout } from "./redux/slice";

const Nav = () => {
  const user = useSelector(({ user }) => user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <nav className="flex flex-row border-black border-2 items-center">
        <button onClick={() => navigate("/")} className="m-1 px-5">
          <img src={Img} alt="keja" className="w-16 rounded-full" />
        </button>

        <h1 className="text-4xl uppercase">Saka-keja</h1>
        <div className="absolute left-3/4 ">
          {user ? (
            <>
              <button
                className=" px-2 rounded-xl bg-blue-600"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                log-out
              </button>
              <button
                className="ml-4 px-2 rounded-xl bg-blue-600"
                onClick={() => navigate("/add")}
              >
                add house
              </button>
              <button
                className="ml-4 px-2 rounded-xl bg-blue-600"
                onClick={() => navigate("/profile")}
              >
                profile
              </button>
            </>
          ) : (
            <button
              className=" px-2 rounded-xl bg-blue-600"
              onClick={() => navigate("/log-in")}
            >
              Log-in
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
