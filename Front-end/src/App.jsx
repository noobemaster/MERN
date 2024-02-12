import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Nav from "./nav";
import Sign from "./sign";
import Add from "./Add";
import House from "./house";
import Comments from "./comments";
import Footer from "./footer";
import { fetch } from "./data";
import { update } from "./slice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch().then((res) => {
      dispatch(update(res));
    });
  }, [useSelector(({ houses }) => houses.signal)]);
  const house = useSelector(({ houses }) => houses.Data);
  const Home = () => (
    <main className="flex flex-wrap">
      {house ? (
        house.map((d) => <House key={d._id} house={d} />)
      ) : (
        <section className="text-white my-24 mx-20 uppercase text-3xl">
          loading......
        </section>
      )}
    </main>
  );
  return (
    <div className="bg-zinc-700">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Sign />} />
        <Route path="/log-in" element={<Sign />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Add />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
