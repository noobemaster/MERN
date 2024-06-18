import { Route, Routes } from "react-router-dom";
import Nav from "../nav";
import Sign_up from "../users/sign-up";
import Log_in from "../users/log-in";
import Add from "./Add";
import Home from "./home";
import Comments from "./comments";
import Footer from "../footer";
import Profile from "../users/profile";
import ProfileEdit from "../users/edit";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { featch } from "../redux/data";
function App() {
  const dispatch = useDispatch();
  const page = useSelector(({ houses }) => houses.page);
  useEffect(() => {
    dispatch(featch({ page }));
  }, [useSelector(({ houses }) => houses.signal)]);
  return (
    <div className="bg-zinc-700">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<Sign_up />} />
        <Route path="/log-in" element={<Log_in />} />
        <Route path="/comments/:id" element={<Comments />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Add />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<ProfileEdit />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
