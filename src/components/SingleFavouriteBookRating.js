import { useState, useEffect } from "react";
import { CustomStarIcon } from "./index";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const SingleFavouriteBookRating = ({ id }) => {
  const { singleFavouriteBook, rateBook } = useAppContext();
  const { userRating } = singleFavouriteBook;

  const [msg, setMsg] = useState("not rated yet");

  const handleChange = async (e) => {
    const index = e.target.parentElement.dataset.index;

    await rateBook(id, index);
  };

  useEffect(() => {
    if (parseInt(userRating) === 1) return setMsg(`horrible`);
    if (parseInt(userRating) === 2) return setMsg(`not that good`);
    if (parseInt(userRating) === 3) return setMsg(`it's alright`);
    if (parseInt(userRating) === 4) return setMsg(`pretty good`);
    if (parseInt(userRating) === 5) return setMsg(`masterpiece`);
  }, [userRating]);

  return (
    <Wrapper>
      <div>
        <h4>my rating</h4>
      </div>
      <div className="icon-container">
        <CustomStarIcon
          text={"horrible"}
          handleChange={handleChange}
          userRating={userRating}
        />
      </div>
      <div className="">{msg}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  div {
    text-align: center;
    padding: 0 0.75rem;
  }

  .icon-container {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
    div {
      padding: 0;
      margin: 0;
    }
  }

  h4 {
    font-weight: 500;
    margin-bottom: 1rem;
  }

  @media screen and (min-width: 1300px) {
    div {
      text-align: left;
    }

    .icon-container {
      justify-content: flex-start;
    }
  }
`;

export default SingleFavouriteBookRating;
