import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import { alertMessages } from "../utils/alertMessages";

const SingleBookButtons = ({ id, favourite, path }) => {
  const {
    isModal,
    openModal,
    changeToAddButton,
    changeToRemoveButton,
    createBookPayload,
    removeFromFavourite,
  } = useAppContext();

  const [bookID, setBookID] = useState(null);

  const { notification, allActions } = isModal;
  const navigate = useNavigate();

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
    setBookID(id);
    try {
      const message =
        "Are you sure you want to remove this book from your favourites?";
      const actionType = "removeFromFavourite";
      const payload = { message, actionType };

      if (notification) return await openModal(payload);

      alertMessages("error", "Removed from favourites!");
      changeToRemoveButton(id);
      await removeFromFavourite(id);
      navigate(`${path}`);
    } catch (error) {
      console.log(error);
      alertMessages("warning", "Something went wrong!");
    }
  };

  useEffect(() => {
    if (allActions.removeFromFavourite) {
      alertMessages("error", "Removed from favourites!");
      changeToRemoveButton(bookID);
      removeFromFavourite(bookID);
      navigate(`${path}`);
    }
  }, [allActions.removeFromFavourite]);

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

      <Link to={path}>
        <button className="btn">back</button>
      </Link>
    </div>
  );
};

export default SingleBookButtons;
