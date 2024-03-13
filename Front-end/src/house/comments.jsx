import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { dbchange, fetch } from "../redux/data";
import Img from "../../public/hse.jfif";
const Comments = () => {
  const dispatch = useDispatch();
  const locol = useParams().id;
  const user = useSelector(({ user }) => user.user);
  const from = useSelector(({ houses }) =>
    houses.Data.find(({ _id }) => _id === locol)
  );
  const {
    _id,
    type,
    location,
    picture,
    price,
    occupied,
    contacts,
    comments,
    description,
  } = from;
  const { county, sub_county, residence } = location;
  const [comment, chgcomment] = useState({
    comment: "",
    action: "Add",
    comid: 0,
  });
  const parentId = _id;
  const edit = () => {
    if (comment.action === "change") {
      dispatch(
        dbchange(parentId, "chcom", comment.comid, user._id, comment.comment)
      );
      chgcomment((prev) => ({ ...prev, comment: "", action: "Add", comid: 0 }));
    } else if (comment.action === "Add") {
      dispatch(dbchange(parentId, "comments", comment.comment, user._id));
      chgcomment((prev) => ({ ...prev, comment: "" }));
    }
  };
  return (
    <div className="flex ">
      <div className="border-2 border-black p-4 w-[50%] pl-10 ">
        {occupied && (
          <p className=" absolute float-right -rotate-45 bg-red-900 px-1 -ml-6 rounded-full bg-opacity-60">
            occupied
          </p>
        )}
        <img src={Img} alt="keja" />
        <p className="py-4">{description ? description : null}</p>
        <h4>Type: {type}</h4>
        <h4 className=" font-bold ">Location</h4>
        <span>
          {county && <p className="pl-4">county: {county}</p>}
          {sub_county && <p className="pl-4"> sub-county: {sub_county}</p>}
          {residence && <p className="pl-4">local: {residence}</p>}
        </span>

        <p> Price: {price}</p>
        <p>Contacts: {contacts}</p>
      </div>
      <section>
        <h1 className="text-center text-3xl capitalize">Comments</h1>
        <hr className="w-full" />
        <div className="flex flex-row mt-4 ml-3">
          <textarea
            placeholder={user ? "Add comments" : "log in to add comments"}
            value={comment.comment}
            onChange={(e) =>
              chgcomment((prev) => ({ ...prev, comment: e.target.value }))
            }
            className="placeholder-gray-400 pl-1 resize-none h-[10vh] w-[25vw]"
          ></textarea>

          {user && (
            <button
              className=" bg-blue-700 rounded-xl  mx-5 px-2"
              onClick={edit}
            >
              {comment.action}
            </button>
          )}
          {comment.action == "change" ? (
            <button
              className=" bg-red-700 rounded-xl   px-2"
              onClick={() =>
                chgcomment((prev) => ({ ...prev, comment: "", action: "Add" }))
              }
            >
              cancel
            </button>
          ) : null}
        </div>
        {comments &&
          comments.map(({ _id, comment, UID }) => (
            <div className="border-2 border-zinc-800 p-3 my-2 ml-2" key={_id}>
              <span>David</span>
              <section className="p-2 text-white">{comment}</section>
              {user && user._id == UID ? (
                <section className="flex flex-row mt-4">
                  <button
                    onClick={() =>
                      chgcomment((prev) => ({
                        ...prev,
                        comment,
                        action: "change",
                        comid: _id,
                      }))
                    }
                    className="basis-1/2 bg-blue-700 rounded-2xl mx-5"
                  >
                    edit
                  </button>
                  <button
                    className="basis-1/2 text-red-900 bg-red-200 rounded-xl mx-5 h-8"
                    onClick={() => dispatch(dbchange(parentId, "delcom", _id))}
                  >
                    delete
                  </button>
                </section>
              ) : null}
            </div>
          ))}
      </section>
    </div>
  );
};
export default Comments;
