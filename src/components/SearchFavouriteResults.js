import { useState, useEffect } from "react";
import notFound from "../assets/404.png";
import { AiFillHeart, MdOutlineOpenInNew } from "../utils/icons";
import { Link } from "react-router-dom";
import { Spinner } from "./index";
import { useAppContext } from "../context/app_context";
import { alertMessages } from "../utils/alertMessages";
import styled from "styled-components";

const SearchFavouriteResults = () => {
  const {
    isModal,
    openModal,
    isLoading,
    allFavouriteBooks,
    removeFromFavourite,
    fetchAllFavouriteBooks,
    numberOfPages,

    setPage,
  } = useAppContext();

  const [currentPage, setCurrentPage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [bookID, setBookID] = useState(null);

  const { notification, allActions } = isModal;
  useEffect(() => {
    fetchAllFavouriteBooks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const pages = Array.from({ length: numberOfPages }, (_, index) => {
      return index + 1;
    });
    setCurrentPage(pages);
    setCurrentIndex(1);
    setPage(1);
    // eslint-disable-next-line
  }, [numberOfPages]);

  useEffect(() => {
    if (allActions.removeFromFavourite) {
      alertMessages("error", "Removed from favourites!");
      removeBookWithNotificationsOn();
    }
    // eslint-disable-next-line
  }, [allActions.removeFromFavourite]);

  const removeBookWithNotificationsOn = async () => {
    try {
      await removeFromFavourite(bookID);
      await fetchAllFavouriteBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const removeBook = async (id) => {
    setBookID(id);
    try {
      const message =
        "Are you sure you want to remove this book from your shelf?";
      const actionType = "removeFromFavourite";
      const payload = { message, actionType };

      if (notification) return await openModal(payload);

      alertMessages("error", "Removed from shelf!");
      await removeFromFavourite(id);
      await fetchAllFavouriteBooks();
    } catch (error) {
      console.log(error);
      alertMessages("warning", "Something went wrong!");
    }
  };

  const handleChange = (e) => {
    const id = e.target.dataset.number;

    setCurrentIndex(parseInt(id));
    setPage(parseInt(id));
  };

  if (isLoading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  if (!allFavouriteBooks || allFavouriteBooks.length === 0) {
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
        {allFavouriteBooks.map((book, i) => {
          const { authors, id, image, publisher, publishedDate, title } = book;

          return (
            <div className="book-container" key={i}>
              <Link to={`/my-bookshelf/${id}`} key={i}>
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
                <AiFillHeart
                  className="heart-icon"
                  onClick={() => removeBook(id)}
                />
                <Link to={`/my-bookshelf/${id}`} key={i}>
                  <MdOutlineOpenInNew className="open-icon" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="number-container">
        {currentPage.map((page) => {
          return (
            <button
              className={currentIndex === page ? "active-btn" : null}
              data-number={page}
              key={page}
              onClick={(e) => handleChange(e)}
            >
              {page}
            </button>
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
      color: yellowgreen;
    }
  }

  .number-container {
    width: min-content;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    text-align: center;

    button {
      cursor: pointer;
      padding: 0.5rem 1rem;
      font-size: 1.5rem;
      background: dodgerblue;
      border-radius: 15px;
      border: none;
      color: whitesmoke;
      margin: 0 0.25rem;
      transition: var(--transition);
      &:hover {
        background: var(--primary-clr-2);
      }
    }

    .active-btn {
      background: yellowgreen;
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

export default SearchFavouriteResults;
