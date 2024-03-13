import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Img from "../../public/hse.jfif";
const House = ({ house }) => {
  const {
    type,
    location,
    picture,
    price,
    occupied,
    contacts,
    description,
    userId,
  } = house;
  const navigate = useNavigate();
  const { county, sub_county, residence } = location;
  const user = useSelector(({ user }) => user.user);
  return (
    <div className="m-2 p-2 px-4 border-2 border-yellow-500 bg-gray-600 relative max-w-[30vw]">
      <div>
        {occupied && (
          <p className=" absolute float-right -rotate-45 bg-red-900 px-1 -ml-6 rounded-full bg-opacity-60">
            occupied
          </p>
        )}
        <img src={Img} alt="keja" />
        <p className="py-4 ">
          {description ? description.slice(0, 200) : ""}
          {description && description.length > 200 ? "...." : ""}
        </p>
        <h4>Type: {type}</h4>
        <details className="overflow-hidden">
          <summary>Location</summary>
          {county && <p className="pl-4">county: {county}</p>}
          {sub_county && <p className="pl-4"> sub-county: {sub_county}</p>}
          {residence && <p className="pl-4">local: {residence}</p>}
        </details>
        <p> Price: {price}</p>
        <p>
          Contacts: +254<a href={`tel:+254${contacts}`}>{contacts}</a>
        </p>
      </div>
      <div className="flex flex-row flex-wrap">
        <button
          onClick={() => navigate(`/comments/${house._id}`)}
          className="cursor-pointer bg-cyan-950 rounded-lg text-blue-100 px-2 pb-1 mt-4 hover:bg-cyan-800"
        >
          comments
        </button>
        {user && userId == user._id ? (
          <button
            onClick={() => navigate(`/edit/${house._id}`)}
            className=" cursor-pointer bg-cyan-950 rounded-lg text-blue-100 px-2 pb-1 mt-4 ml-2 hover:bg-cyan-800"
          >
            edit
          </button>
        ) : null}
      </div>
    </div>
  );
};
export default House;
