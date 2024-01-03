import Add from "./Add";
import { useSelector } from "react-redux";
import Footer from "./footer";
import House from "./house";
import Nav from "./nav";
import { Route, Routes } from "react-router-dom";
import Sign from "./sign";
import Comments from "./comments";
function App() {
  const house = useSelector((state) => state.data);
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
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<Sign />} />
          <Route path="/log-in" element={<Sign />} />
          <Route path="/comments/:id" element={<Comments />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:id" element={<Add />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}
export default App;
