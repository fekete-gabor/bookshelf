import { useState, useEffect } from "react";
import notFound from "../assets/404.png";
import { Link, Navigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  MdOutlineOpenInNew,
} from "../utils/icons";
import { useAppContext } from "../context/app_context";
import { alertMessages } from "../utils/alertMessages";
import styled from "styled-components";

const SearchResults = () => {
  const {
    isError,
    isModal,
    openModal,
    allBooks,
    fetchSingleBookFromGoogle,
    fetchUniqueIDs,
    createBookPayload,
    removeFromFavourite,
    changeToAddButton,
    changeToRemoveButton,
  } = useAppContext();

  const [bookID, setBookID] = useState(null);

  const { notification, allActions } = isModal;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchUniqueIDs();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allActions.removeFromFavourite) {
      alertMessages("error", "Removed from favourites!");
      removeFromFavourite(bookID);
      changeToRemoveButton(bookID);
    }
    // eslint-disable-next-line
  }, [allActions.removeFromFavourite]);

  const addBook = async (id) => {
    try {
      changeToAddButton(id);
      alertMessages("success", "Added to favourites!");
      await fetchSingleBookFromGoogle(id);
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

      changeToRemoveButton(id);
      alertMessages("error", "Removed from favourites!");
      await removeFromFavourite(id);
    } catch (error) {
      console.log(error);
      alertMessages("warning", "Something went wrong!");
    }
  };

  if (isError) {
    return <Navigate to="/error" />;
  }

  if (!allBooks) {
    return (
      <Wrapper>
        <div className="error-container">
          <h2>No books found...</h2>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="main-container">
        {allBooks.map((book, i) => {
          const { title, authors, publishedDate, publisher, favourite } =
            book.volumeInfo;
          const { id } = book;
          const image = book?.volumeInfo?.imageLinks?.thumbnail;

          return (
            authors &&
            title &&
            id && (
              <div className="book-container" key={i}>
                <Link to={`/search/${id}`} key={i}>
                  <header>
                    <img src={image || notFound} alt={title} />
                  </header>
                </Link>
                <article>
                  <h4>{title}</h4>
                  <div className="book-desc">
                    {authors.map((author, i) => {
                      return (
                        <p key={i} className="author">
                          {author.toUpperCase()}
                        </p>
                      );
                    })}
                    {publishedDate && (
                      <p>{`date of publish: ${publishedDate}`}</p>
                    )}
                    {publisher && <p>{`publisher: ${publisher}`}</p>}
                  </div>
                </article>
                <div className="icon-container">
                  {favourite === true ? (
                    <AiFillHeart
                      className="heart-icon"
                      onClick={() => removeBook(id)}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="heart-icon"
                      onClick={() => addBook(id)}
                    />
                  )}
                  <Link to={`/search/${id}`} key={i}>
                    <MdOutlineOpenInNew className="open-icon" />
                  </Link>
                </div>
              </div>
            )
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 7.5rem;
  z-index: 1;

  .main-container {
    width: 100%;
    display: grid;
    text-align: center;
    gap: 1rem 0;
  }

  .book-container {
    padding: 0.5rem;
    display: grid;
    grid-template-rows: 1fr 1fr;
    position: relative;
    background: whitesmoke;
    border-radius: 15px;
  }

  .error-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  header {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    max-width: 350px;
    max-height: 350px;
    object-fit: scale-down;
    border-radius: 15px;
  }

  article {
    height: 100%;
    display: grid;
    align-items: center;
  }

  h4,
  p {
    color: black;
  }

  .icon-container {
    position: absolute;
    top: 15px;
    right: 10px;
    svg {
      cursor: pointer;
      padding: 0.25rem;
      font-size: 2.5rem;
      transition: var(--transition);
    }
  }

  .heart-icon {
    color: orangered;
    &:hover {
      color: dodgerblue;
    }
  }

  .open-icon {
    color: plum;
    &:hover {
      color: var(--primary-clr-1);
    }
  }

  @media screen and (min-width: 600px) {
    .main-container {
      border-radius: 15px;
      margin: 0 auto;
      padding: 1rem;
      grid-template-columns: repeat(auto-fit, minmax(350px, 600px));
      place-content: center;
      gap: 0.25rem;
    }

    .error-container {
      width: fit-content;
      border-radius: 15px;
      margin: 0 auto;
      padding: 1rem;
      background: whitesmoke;
    }

    .book-container {
      background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
      transition: var(--transition);
      &:hover {
        background: whitesmoke;
      }
      &:hover h4 {
        color: black;
      }
      &:hover p {
        color: black;
      }
      &:hover .author {
        color: dodgerblue;
      }
    }

    h4,
    p {
      color: honeydew;
    }
  }
`;

export default SearchResults;
