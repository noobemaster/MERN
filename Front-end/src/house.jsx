import Img from "../public/hse.jfif";
import { Link } from "react-router-dom";
const House = ({ house }) => {
  const { type, location, picture, price, occupied, contacts, description } =
    house;
  const { county, sub_county, residence } = location;
  return (
    <div className="m-2 p-2 px-4 border-2 border-yellow-500 bg-gray-600 relative ">
      <div>
        {occupied && (
          <p className=" absolute float-right -rotate-45 bg-red-900 px-1 -ml-6 rounded-full bg-opacity-60">
            occupied
          </p>
        )}
        <img src={Img} alt="keja" />
        <p className="py-4">{description ? description : ""}</p>
        <h4>Type: {type}</h4>
        <details>
          <summary>Location</summary>
          <p className="pl-4">county: {county}</p>
          <p className="pl-4"> sub-county: {sub_county}</p>
          <p className="pl-4">local: {residence}</p>
        </details>
        <p> Price: {price}</p>
        <p>
          Contacts: +254<a href={`tel:+254${contacts}`}>{contacts}</a>
        </p>
      </div>
      <div className="flex flex-row ">
        <Link
          to="/comments"
          state={{ from: house }}
          className="cursor-pointer bg-cyan-950 rounded-lg text-blue-100 px-2 pb-1 my-10 hover:bg-cyan-800"
        >
          comments
        </Link>
        <Link
          to="/edit"
          state={house}
          className=" cursor-pointer bg-cyan-950 rounded-lg text-blue-100 px-2 pb-1 my-10 ml-4 hover:bg-cyan-800"
        >
          edit
        </Link>
      </div>
    </div>
  );
};
export default House;
