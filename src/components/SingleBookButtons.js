import { Link } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import { alertMessages } from "../utils/alertMessages";

const SingleBookButtons = ({ id, favourite }) => {
  const {
    changeToAddButton,
    changeToRemoveButton,
    createBookPayload,
    removeFromFavourite,
  } = useAppContext();

  const addBook = async () => {
    try {
      alertMessages("success", "Added to favourites!");
      changeToAddButton(id);
      await createBookPayload();
    } catch (error) {
      console.log(error);
      alertMessages("warning", "Something went wrong!");
    }
  };

  const removeBook = async (id) => {
    try {
      alertMessages("error", "Removed from favourites!");
      changeToRemoveButton(id);
      await removeFromFavourite(id);
    } catch (error) {
      console.log(error);
      alertMessages("warning", "Something went wrong!");
    }
  };

  return (
    <div className="btn-container">
      {favourite === true ? (
        <button className="btn remove-btn" onClick={() => removeBook(id)}>
          remove from favourites
        </button>
      ) : (
        <button className="btn add-btn" onClick={() => addBook()}>
          add to favourites
        </button>
      )}

      <Link to="/search">
        <button className="btn">back</button>
      </Link>
    </div>
  );
};

export default SingleBookButtons;
