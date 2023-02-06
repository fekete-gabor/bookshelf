import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  SingleBookDescriptions,
  SingleBookButtons,
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
        <SingleBookButtons id={id} favourite={true} path="/my-bookshelf" />
      </div>
      <SingleFavouriteBookEdit />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .book-container {
    display: flex;
    background: whitesmoke;
  }
`;

export default SingleFavouriteBook;
