import { useSelector } from "react-redux";
import House from "../house/house";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const user = useSelector(({ user }) => user.user);
  const houses = useSelector(({ houses }) => houses.Data);
  const navigate = useNavigate();
  let list = [];
  let occupied = [];
  user.houseIds.forEach((u) =>
    houses.forEach((h) => u == h._id && list.push(h))
  );
  list?.forEach((l) => l.occupied && occupied.push(l));
  return (
    <div>
      <span className="text-center text-xl capitalize">
        <h1>my profile</h1>
      </span>
      <section className="flex mt-4 ">
        <div className="block text-center">
          <img
            alt="profile pic"
            src=""
            className="mr-12 rounded-full w-32 h-32 "
          />
          {user.name && <h3>{user.name}</h3>}
          {user.email && <h3>{user.email}</h3>}
          {user.telephone && <h3>{user.telephone}</h3>}
        </div>
        <div className="block text-center mx-8">
          <h2>{list.length}</h2>
          <p>house{list.length > 1 ? "s" : null}</p>
        </div>
        <div className="block text-center mx-8">
          <h2>{occupied.length}</h2>
          <p>house{occupied.length > 1 ? "s" : null} occupied</p>
        </div>
      </section>
      <br />
      <button
        onClick={() => navigate("/edit-profile")}
        className="text-white px-4 border-2 border-black bg-cyan-950"
      >
        edit-profile
      </button>
      <hr className="mx-10 mt-12 mb-4 border-black border-2" />
      <span className="text-center text-xl capitalize">
        <h3>your houses</h3>
      </span>
      <section className="flex flex-wrap">
        {list.length ? (
          list.map((l) => <House key={l._id} house={l} />)
        ) : (
          <h1> no houses yet...</h1>
        )}
      </section>
    </div>
  );
};
export default Profile;
