import { useEffect } from "react";
import { add_success, remove_success, error } from "../utils/alertMessages";
import { Link, Navigate } from "react-router-dom";
import { CustomDescription } from "./index";
import notFound from "../assets/404.png";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import { toast } from "react-toastify";
import styled from "styled-components";

const SingleBook = () => {
  const {
    isLoading,
    isError,
    fetchAllFavouriteBooks,
    fetchSingleBookFromGoogle,
    changeToAddButton,
    changeToRemoveButton,
    singleBook,
    createBookPayload,
    removeFromFavourite,
  } = useAppContext();

  const { id } = useParams();

  const addBook = async () => {
    try {
      toast.success(add_success);
      changeToAddButton(id);
      await createBookPayload();
    } catch (err) {
      console.log(err);
      toast.warning(error);
    }
  };

  const removeBook = async (id) => {
    try {
      toast.error(remove_success);
      changeToRemoveButton(id);
      await removeFromFavourite(id);
    } catch (err) {
      console.log(err);
      toast.warning(error);
    }
  };

  const {
    title,
    subtitle,
    authors,
    averageRating,
    ratingsCount,
    categories,
    description,
    language,
    pageCount,
    publishedDate,
    publisher,
    image,
    favourite,
  } = singleBook;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetchBooks = async (id) => {
    try {
      await fetchAllFavouriteBooks();
      await fetchSingleBookFromGoogle(id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks(id);
    // eslint-disable-next-line
  }, [id]);

  if (isLoading) {
    return (
      <Wrapper>
        <h1>Loading...</h1>
      </Wrapper>
    );
  }

  if (isError) {
    return <Navigate to="/error" />;
  }

  return (
    <Wrapper>
      <div className="book-container">
        <header>
          <img src={image || notFound} alt={title} />
        </header>
        <article>
          <CustomDescription
            fieldName="title"
            className="title"
            showFieldName
            value={title}
          />
          <CustomDescription
            fieldName="subtitle"
            className="subtitle"
            showFieldName
            value={subtitle}
          />
          <CustomDescription
            fieldName="authors"
            className="authors"
            showFieldName
            value={authors}
          />
          <CustomDescription
            fieldName="average rating"
            className="averageRating"
            showFieldName
            value={averageRating && `${averageRating} / 5`}
          />
          <CustomDescription
            fieldName="ratings count"
            className="ratingsCount"
            showFieldName
            value={ratingsCount}
          />
          <CustomDescription
            fieldName="categories"
            className="categories"
            showFieldName
            value={categories}
          />
          <CustomDescription
            fieldName="description"
            className="description"
            value={description}
          />
          <CustomDescription
            fieldName="language"
            className="language"
            showFieldName
            value={language}
          />
          <CustomDescription
            fieldName="page count"
            className="pageCount"
            showFieldName
            value={pageCount}
          />
          <CustomDescription
            fieldName="publisher"
            className="publisher"
            showFieldName
            value={publisher}
          />
          <CustomDescription
            fieldName="date of publish"
            className="dateOfPublish"
            showFieldName
            value={publishedDate}
          />
        </article>
        <div className="btn-container">
          {favourite === true ? (
            <button onClick={() => removeBook(id)}>
              remove from favourites
            </button>
          ) : (
            <button onClick={() => addBook()}>add from favourites</button>
          )}

          <Link to="/search">
            <button>back</button>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background: whitesmoke;
  padding-top: 50px;

  .book-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    div {
      margin-bottom: 0.5rem;
      padding: 1rem;
      border-bottom: dotted 1px goldenrod;
    }
    .btn-container {
      border: none;
    }
  }

  img {
    max-width: 350px;
    max-height: 350px;
    object-fit: scale-down;
    border-radius: 15px;
  }

  .authors {
    color: dodgerblue;
  }

  button {
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin: 0.25rem 0.5rem;
    padding: 1rem;
    border: solid 1px transparent;
    border-radius: 15px;
    color: honeydew;
    background: salmon;
    transition: var(--transition);
    &:hover {
      border: solid 1px black;
      color: salmon;
      background: honeydew;
    }
  }

  h4 {
    color: black;
  }

  @media screen and (min-width: 792px) {
    width: 700px;
    margin: 0 auto;
    .book-container {
      padding: 0 5rem;
      margin: 0 auto;
    }
  }
`;

export default SingleBook;
