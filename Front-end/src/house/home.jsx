import House from "./house";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { featch } from "../redux/data";
import { detectChanges } from "./Add";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const dispatch = useDispatch();
  const { Data } = useSelector(({ houses }) => houses);
  const defaultVal = {
    type: "type",
    county: String(),
    sub_county: String(),
    price: String(),
  };
  const Navigate = useNavigate();
  const [type, settype] = useState(defaultVal);
  function search() {
    const q = detectChanges(defaultVal, type);
    const keys = Object.keys(q);
    let url = "";
    for (const key of keys) {
      url += `${key}=${q[key]}&`;
    }
    Navigate(`/?${url}`);
    dispatch(featch(q));
  }
  return (
    <>
      <section className="py-2">
        <span className="capitalize  text-lg py-4">
          county:
          <input
            type="search"
            className="mx-2 rounded px-2"
            onChange={(e) => settype((v) => ({ ...v, county: e.target.value }))}
            value={type.county}
          />
        </span>
        <span className="capitalize text-lg py-4">
          sub-county:
          <input
            type="search"
            name="sub-county"
            className="mx-2 rounded px-2"
            onChange={(e) =>
              settype((v) => ({ ...v, sub_county: e.target.value }))
            }
            value={type.sub_county}
          />
        </span>
        <span className="capitalize text-lg py-4">
          price:
          <input
            type="search"
            name="price"
            className="mx-2 rounded px-2"
            onChange={(e) => settype((v) => ({ ...v, price: e.target.value }))}
            value={type.price > 0 ? type.price : undefined}
          />
        </span>
        <label htmlFor="type">
          Type:
          <select
            name="type"
            onChange={(e) => settype((v) => ({ ...v, type: e.target.value }))}
            className="bg-slate-400 my-1 ml-2 "
            defaultValue={type.type ? type.type : "type"}
          >
            <option>type</option>
            <option>single-room</option>
            <option>beadseater</option>
            <option>1-beadroom</option>
            <option>2-beadroom</option>
            <option>3-beadroom</option>
          </select>
        </label>
        <input
          type="button"
          value="search"
          onClick={search}
          className="mx-2 bg-blue-500 rounded px-2"
        />
      </section>
      <main className="flex flex-wrap">
        {Data ? (
          Data?.length > 0 ? (
            Data.map((d) => <House key={d._id} house={d} />)
          ) : (
            <section className="text-white my-24 mx-20 uppercase text-3xl">
              no such data
            </section>
          )
        ) : (
          <section className="text-white my-24 mx-20 uppercase text-3xl">
            loading......
          </section>
        )}
      </main>
    </>
  );
};
export default Home;
