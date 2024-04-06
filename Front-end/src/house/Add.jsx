import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { dbchange } from "../redux/data";
export function detectChanges(previousObject, updatedObject) {
  const changes = {};
  // Helper function to check if two values are equal
  function valuesAreEqual(value1, value2) {
    if (typeof value1 === "object" && typeof value2 === "object") {
      // Handle nested objects
      const keys1 = Object.keys(value1);
      const keys2 = Object.keys(value2);
      if (keys1.length !== keys2.length) {
        return false;
      }
      for (const key of keys1) {
        if (!valuesAreEqual(value1[key], value2[key])) {
          return false;
        }
      }
      return true;
    } else {
      return value1 === value2;
    }
  }

  // Iterate through the properties of the updatedObject
  for (const key in updatedObject) {
    if (updatedObject.hasOwnProperty(key)) {
      const previousValue = previousObject[key];
      const updatedValue = updatedObject[key];

      // Compare the values
      if (!valuesAreEqual(previousValue, updatedValue)) {
        changes[key] = updatedValue;
      }
    }
  }

  return changes;
}
const Add = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname.split("/")[1];
  const locol = useParams().id;
  const valu = useSelector(({ houses }) =>
    houses.Data.find(({ _id }) => _id === locol)
  );
  const user = useSelector((state) => state.user.user);
  const defaultVal = {
    type: "type",
    location: { county: "", sub_county: "", residence: "" },
    picture: String(),
    description: String(),
    price: String(),
    occupied: Boolean(),
    contacts: user.telephone || String(),
    userId: String(),
  };
  const [type, settype] = useState(valu ? valu : defaultVal);
  const dispatch = useDispatch();
  /*  ********Views the image in clientside*********/
  var loadFile = function (event) {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]); //.split("b:")[1];
    console.log(output);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };
  const val = (e) => {
    switch (e.target.name) {
      case "type":
        settype((v) => ({ ...v, type: e.target.value }));
        break;
      case "county":
        settype((v) => ({
          ...v,
          location: { ...v.location, county: e.target.value },
        }));

        break;
      case "description":
        settype((v) => ({ ...v, description: e.target.value }));
        break;
      case "sub-county":
        settype((v) => ({
          ...v,
          location: { ...v.location, sub_county: e.target.value },
        }));

        break;
      case "residence":
        settype((v) => ({
          ...v,
          location: { ...v.location, residence: e.target.value },
        }));
        break;
      case "price":
        settype((v) => ({ ...v, price: e.target.value }));
        break;
      case "occuppied":
        settype((v) => ({ ...v, occupied: e.target.checked }));
        break;
      case "contacts":
        settype((v) => ({ ...v, contacts: e.target.value }));
        break;
      default:
        console.log("no such name");
        break;
    }
  };
  const submit = (e) => {
    e.preventDefault();
    if (path === "add") {
      if (
        type.contacts &&
        type.price >= 2500 &&
        type.location.county !== "" &&
        type.type !== "type"
      ) {
        switch (true) {
          case type.location.sub_county === "":
            delete type.location.sub_county;

          case type.location.residence === "":
            delete type.location.residence;
            break;
        }
        type.userId = user._id;
        dispatch(dbchange(type, "new"));
        alert("added sucessfully");
      } else if (type.type === "type") {
        alert("please provide type of house");
        return;
      } else if (type.location.county === "") {
        alert("please fill county");
        return;
      } else if (type.price < 2500) {
        alert("price should be more than 2500");
        return;
      } else if (!type.contacts) {
        alert("please fill contacts");
        return;
      }
      settype(defaultVal);
    } else {
      const changes = detectChanges(valu, type);
      Object.keys(changes).length > 0
        ? dispatch(dbchange(type._id, "chhouse", changes))
        : null;
    }
    navigate(-1);
  };
  function dilit(e) {
    e.preventDefault();
    const res = prompt("Type 'yes' to confirm delete");
    if (res == "yes") {
      dispatch(dbchange(type._id, "delete", user._id));
      navigate(-1);
    } else {
      return;
    }
  }
  return (
    <div className=" bg-black opacity-80 py-10 ">
      <form className="bg-gray-300 flex flex-col  mx-[20%] rounded-xl p-6 ">
        <span className="flex pb-2">
          <h1 className="basis-1/2 capitalize font-bold text-lg">
            {path} here
          </h1>
          {path === "edit" ? (
            <button
              onClick={(e) => {
                dilit(e);
              }}
              className=" bg-red-300 rounded-full px-2 basis-1/2"
            >
              Delete
            </button>
          ) : null}
        </span>
        <label htmlFor="type">
          Type:
          <select
            name="type"
            onChange={(e) => val(e)}
            className="bg-slate-400 my-1 ml-2 w-3/4"
            defaultValue={type.type}
            required
          >
            <option disabled hidden>
              type
            </option>
            <option value="single-room">single-room</option>
            <option value="beadseater">beadseater</option>
            <option value="1-beadroom">1-beadroom</option>
            <option value="2-beadroom">2-beadroom</option>
            <option value="3-beadroom">3-beadroom</option>
          </select>
        </label>
        <br />
        <h2>description:</h2>
        <textarea
          name="description"
          value={type.description}
          onChange={(e) => val(e)}
          placeholder="description"
        ></textarea>
        <span>
          <h1>location</h1>
          <label htmlFor="c">County:</label>
          <input
            name="county"
            type="text"
            value={type.location.county}
            id="c"
            required
            onChange={(e) => val(e)}
            className="bg-slate-200 my-1 ml-2 border-2 border-black"
          />
          <br />
          <label htmlFor="s">Sub-county:</label>
          <input
            type="text"
            name="sub-county"
            value={type.location.sub_county}
            onChange={(e) => val(e)}
            className="bg-slate-200 my-1 ml-2 border-2 border-black"
          />
          <br />
          <label htmlFor="r">Residence: </label>
          <input
            type="text"
            name="residence"
            value={type.location.residence}
            onChange={(e) => val(e)}
            className="bg-slate-200 my-1 ml-2 border-2 border-black"
          />
        </span>
        <br />
        <img id="output" className="w-72 h-64 ml-6 my-2 hidden" alt="hse" />
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => loadFile(e)}
        />
        <br />
        <label htmlFor="p">
          Price:
          <input
            type="number"
            name="price"
            onChange={(e) => val(e)}
            value={type.price}
            min={2500}
            className="bg-slate-200 my-1 ml-2 border-2 border-black"
            required
          />
        </label>
        <br />
        <label htmlFor="o">
          <input
            type="checkbox"
            name="occuppied"
            onChange={(e) => val(e)}
            checked={type.occupied}
            className="bg-slate-200 my-1 ml-2"
          />
          &nbsp; Occupied
        </label>
        <br />
        <label htmlFor="co">
          Contacts:
          <input
            type="tel"
            name="contacts"
            onChange={(e) => val(e)}
            value={type.contacts}
            className="bg-slate-200 my-2 ml-2 border-2 border-black"
            required
          />
        </label>
        <div className="flex flex-row ">
          <button
            onClick={(e) => submit(e)}
            className="basis-1/2 bg-blue-700 rounded-2xl mx-5"
          >
            {path === "edit" ? "edit" : "submit"}
          </button>
          <button
            onClick={(e) => e.preventDefault() || navigate(-1)}
            className="basis-1/2  bg-red-500 rounded-xl mx-5 h-8 text-center"
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default Add;
