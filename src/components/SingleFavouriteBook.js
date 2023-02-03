import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  SingleBookDescriptions,
  SingleFavouriteBookButtons,
  SingleFavouriteBookEdit,
} from "./index";
import notFound from "../assets/404.png";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const SingleFavouriteBook = () => {
  const {
    isLoading,
    isError,
    fetchSingleBookFromMongoDB,
    singleFavouriteBook,
  } = useAppContext();

  const { id } = useParams();

  useEffect(() => {
    fetchSingleBookFromMongoDB(id);
    // eslint-disable-next-line
  }, [id]);

  const { title, image } = singleFavouriteBook;

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
        <SingleBookDescriptions bookInfo={singleFavouriteBook} />
        <SingleFavouriteBookButtons id={id} />
      </div>
      <SingleFavouriteBookEdit />
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
