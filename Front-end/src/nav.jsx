import { useState } from "react";
import { Link } from "react-router-dom";
import Img from "../public/hse.jfif";
const Nav = ({ user, logout }) => {
  return (
    <>
      <nav className="flex flex-row border-black border-2 items-center">
        <Link to="/" className="m-1 px-5">
          <img src={Img} alt="keja" className="w-16 rounded-full" />
        </Link>

        <h1 className="text-4xl uppercase">Saka-keja</h1>
        <div className="absolute left-3/4 ">
          {user ? (
            <>
              <button
                className=" px-2 rounded-xl bg-blue-600"
                onClick={() => logout(false)}
              >
                log-out
              </button>
              <button className="ml-4 px-2 rounded-xl bg-blue-600">
                <Link to="/add">add house</Link>
              </button>{" "}
            </>
          ) : (
            <button className=" px-2 rounded-xl bg-blue-600">
              <Link to="/sign-in">sign-in</Link>
            </button>
          )}
        </div>
      </nav>
    </>
  );
};
export default Nav;
