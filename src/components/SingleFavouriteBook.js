import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { CustomDescription } from "./index";
import notFound from "../assets/404.png";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import { alertMessages } from "../utils/alertMessages";
import styled from "styled-components";

const SingleFavouriteBook = () => {
  const {
    isLoading,
    isError,
    fetchSingleBookFromMongoDB,
    singleFavouriteBook,
    removeFromFavourite,
  } = useAppContext();

  const { id } = useParams();

  const removeBook = async () => {
    try {
      alertMessages("error", "Removed from favourites!");
      await removeFromFavourite(id);
    } catch (error) {
      console.log(error);
      alertMessages("warning", "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchSingleBookFromMongoDB(id);
    // eslint-disable-next-line
  }, [id]);

  const {
    title,
    subtitle,
    authors,
    averageRating,
    myRating,
    ratingsCount,
    categories,
    description,
    language,
    pageCount,
    publishedDate,
    publisher,
    image,
  } = singleFavouriteBook;

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
            fieldName="my rating"
            className="myRating"
            showFieldName
            value={`${myRating} / 5`}
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
      display: flex;
      flex-direction: column;
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

export default SingleFavouriteBook;
