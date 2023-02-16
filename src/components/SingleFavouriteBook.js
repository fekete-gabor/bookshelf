import { useState, useEffect } from "react";
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
import useMediaQuery from "../utils/mediaQuery";
import { gsap } from "gsap/dist/gsap";

const SingleFavouriteBook = () => {
  const {
    isLoading,
    isError,
    fetchSingleBookFromMongoDB,
    singleFavouriteBook,
  } = useAppContext();

  const { id } = useParams();
  const mediaQuery = useMediaQuery("(min-width: 1300px)");
  const [mainComponent, setMainComponent] = useState("details");
  const mainContainer = document.querySelector(".main-container");

  const handleChange = (e) => {
    setMainComponent(e.target.dataset.category);
  };

  useEffect(() => {
    fetchSingleBookFromMongoDB(id);
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    // additional if condition to avoid gsap console warning
    if (mainContainer) {
      if (!mediaQuery) {
        gsap.to(mainContainer, { width: "100%", duration: 1 });
      }

      if (mediaQuery && mainComponent === "details") {
        gsap.to(mainContainer, { width: "750px", duration: 1 });
      }

      if (mediaQuery && mainComponent === "edit") {
        gsap.to(mainContainer, { width: "100%", duration: 1 });
      }
    }
  }, [mediaQuery, mainContainer, mainComponent]);

  const { authors, title, image } = singleFavouriteBook;

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
    <Wrapper className="main-container">
      <div className="category-container">
        <button
          className={mainComponent === "details" ? "active-btn btn" : "btn"}
          data-category="details"
          onClick={(e) => handleChange(e)}
        >
          details
        </button>
        <button
          className={mainComponent === "edit" ? "active-btn btn" : "btn"}
          data-category="edit"
          onClick={(e) => handleChange(e)}
        >
          my notes
        </button>
      </div>
      {mainComponent === "details" ? (
        <div className="book-container">
          <header>
            <img src={image || notFound} alt={title} />
          </header>
          <SingleBookDescriptions bookInfo={singleFavouriteBook} />
          <SingleBookButtons id={id} favourite={true} path="/my-bookshelf" />
        </div>
      ) : (
        <div className="edit-container">
          <h3>now editing</h3>
          <article className="edit-title-container">
            {authors.map((author, i) => {
              return (
                <h4 key={i}>
                  {author}
                  {authors.length - 1 === i ? null : ","}
                </h4>
              );
            })}
            <h4>- {title}</h4>
          </article>
          <SingleFavouriteBookEdit />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-top: 50px;
  background: whitesmoke;

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

  .category-container {
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .edit-container {
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    article {
      gap: 0.5rem;
      margin-bottom: 2rem;
      h4 {
        padding: 1rem 0;
        color: dodgerblue;
      }
    }
  }

  .edit-title-container {
    display: flex;
    justify-content: center;
    flex-direction: unset;
  }

  .active-btn {
    background: yellowgreen;
  }

  @media screen and (min-width: 1300px) {
    width: 750px;
    margin: 0 auto;
    .book-container {
      padding: 0 5rem;
      margin: 0 auto;
    }
  }
`;

export default SingleFavouriteBook;
