import { useState } from "react";
import { Link } from "react-router-dom";
import Img from "../public/hse.jfif";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./slice";
const Nav = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function signout() {
    localStorage.clear();
    dispatch(logout());
  }
  return (
    <>
      <nav className="flex flex-row border-black border-2 items-center">
        <Link to="/" className="m-1 px-5">
          <img src={Img} alt="keja" className="w-16 rounded-full" />
        </Link>

        <h1 className="text-4xl uppercase">Saka-keja</h1>
        <div className="absolute left-3/4 ">
          {user.length ? (
            <>
              <button
                className=" px-2 rounded-xl bg-blue-600"
                onClick={signout}
              >
                log-out
              </button>
              <button className="ml-4 px-2 rounded-xl bg-blue-600">
                <Link to="/add">add house</Link>
              </button>{" "}
            </>
          ) : (
            <button className=" px-2 rounded-xl bg-blue-600">
              <Link to="/log-in">Log-in</Link>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
