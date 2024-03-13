import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { usercontroll } from "../redux/data";
const ProfileEdit = () => {
  const navigate = useNavigate();
  const User = useSelector(({ user }) => user.user);
  const initial = {
    id: User._id,
    email: User.email,
    telephone: User.telephone,
    name: User.name,
    password: { old: undefined, new: undefined, confirm: undefined },
  };
  const [user, setUser] = useState(initial);
  const [view, setview] = useState({
    old: true,
    new: true,
    con: true,
  });
  const dispatch = useDispatch();
  const submit = () => {
    switch (true) {
      case user.telephone && user.telephone.length != 9:
        alert("invalid number");
        return;
      case user.email && !user.email.includes("@"):
        alert("email must have @");
        return;
      case user.password.new != undefined && user.password.old == undefined:
        alert("provide old");
        return;
      case user.password.new != undefined &&
        user.password.old == user.password.new:
        alert("old password cannot be new password");
        return;
      case user.password.confirm != user.password.new:
        alert("confirm new pass word");
        return;
    }
    user.name == User.name && delete user.name;
    user.email == User.email && delete user.email;
    user.telephone == User.telephone && delete user.telephone;
    const i = { ...user };
    if (user.password.new == undefined) {
      delete i.password;
      Object.keys(i).length > 1 ? dispatch(usercontroll(i, "update")) : null;
      navigate(-1);
    } else if (
      user.password.old != undefined &&
      user.password.new == user.password.confirm
    ) {
      delete i.password.confirm;
      Object.keys(i).length > 1 ? dispatch(usercontroll(user, "update")) : null;
      navigate(-1);
    }
  };
  function dilit() {
    const res = prompt("Type 'yes' to delete profile");
    if (res == "yes") {
      dispatch(dbchange(type._id, "delete", user._id));
      navigate(-1);
    } else {
      return;
    }
  }
  return (
    <div className=" py-[25vh]  h-[100vh]">
      <div className="bg-gray-300 flex flex-col  mx-[20%]  rounded-xl p-6 capitalize">
        <span className="flex pb-2">
          <h1 className=" font-black text-2xl  capitalize basis-1/2 ">
            profile edit
          </h1>
          <button
            onClick={dilit}
            className=" bg-red-300 rounded-full px-2 basis-1/2"
          >
            Delete
          </button>
        </span>
        <span>
          <h4>user name:</h4>
          <input
            type="text"
            className="my-3 w-3/4 ml-2"
            onChange={(e) => setUser((p) => ({ ...p, name: e.target.value }))}
            value={user.name}
          />
        </span>
        <span>
          <h4>phone-number:</h4>
          +254
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
          <h4>email:</h4>
          <input
            type="email"
            className="my-3 w-3/4 ml-2"
            onChange={(e) => setUser((p) => ({ ...p, email: e.target.value }))}
            value={user.email}
          />
        </span>
        <details>
          <summary>change password</summary>
          <br />
          <span>
            <h4>old password:</h4>
            <input
              type={view.old ? "password" : "text"}
              className="my-3 w-3/4 ml-2"
              onChange={(e) =>
                setUser((p) => ({
                  ...p,
                  password: { ...p.password, old: e.target.value },
                }))
              }
              value={user.password.old}
            />
            <button onClick={() => setview((p) => ({ ...p, old: !p.old }))}>
              see
            </button>
          </span>
          <span>
            <h4>new password:</h4>
            <input
              type={view.new ? "password" : "text"}
              className="my-3 w-3/4 ml-2"
              onChange={(e) =>
                setUser((p) => ({
                  ...p,
                  password: { ...p.password, new: e.target.value },
                }))
              }
              value={user.password.new}
            />
            <button onClick={() => setview((p) => ({ ...p, new: !p.new }))}>
              see
            </button>
          </span>
          <span>
            <h4>confirm new password:</h4>
            <input
              type={view.con ? "password" : "text"}
              className="my-3 w-3/4 ml-2"
              onChange={(e) =>
                setUser((p) => ({
                  ...p,
                  password: { ...p.password, confirm: e.target.value },
                }))
              }
              value={user.password.confirm}
            />{" "}
            <button onClick={() => setview((p) => ({ ...p, con: !p.con }))}>
              see
            </button>
          </span>
        </details>
        <br />
        <div className="flex flex-row ">
          <button
            className="basis-1/2 bg-blue-700 rounded-2xl mx-3 h-8 text-center pt-1"
            onClick={submit}
          >
            edit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="basis-1/2 text-red-900 bg-red-200 rounded-xl mx-3 h-8 text-center pt-1"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
