import { Link } from "react-router-dom";
import { alertMessages } from "../utils/alertMessages";
import { useAppContext } from "../context/app_context";

const SingleFavouriteBookButtons = ({ id }) => {
  const { removeFromFavourite } = useAppContext();

  const removeBook = async () => {
    try {
      alertMessages("error", "Removed from favourites!");
      await removeFromFavourite(id);
    } catch (error) {
      console.log(error);
      alertMessages("warning", "Something went wrong!");
    }
  };

  return (
    <div className="btn-container">
      <Link to="/my-bookshelf">
        <button className="btn remove-btn" onClick={() => removeBook(id)}>
          remove from favourites
        </button>
      </Link>
      <button className="btn edit-btn">save changes</button>
      <Link to="/my-bookshelf">
        <button className="btn">back</button>
      </Link>
    </div>
  );
};

export default SingleFavouriteBookButtons;
