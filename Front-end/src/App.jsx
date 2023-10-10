import Add from "./Add";
import { useSelector } from "react-redux";
import Footer from "./footer";
import House from "./house";
import Nav from "./nav";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Sign from "./sign";
import Comments from "./comments";
import Data from "./data";
function App() {
  const house = useSelector((state) => state.data.house);
  const [user, setuser] = useState(false);
  const Home = () => (
    <>
      <main className="flex flex-wrap">
        {house.map((d) => {
          return <House key={d._id} house={d} />;
        })}
      </main>
    </>
  );
  return (
    <>
      <div className="bg-zinc-700">
        <Nav user={user} logout={setuser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Sign login={setuser} />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Add />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
export default App;
