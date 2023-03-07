import { useState, useEffect } from "react";
import { formatSearchValues } from "../utils/formatSearchValues";
import { fetchLimit } from "../utils/fetchLimit";
import { useAppContext } from "../context/app_context";
import { SlMagnifier, SlClose } from "../utils/icons";
import CustomInput from "./CustomInput";
import styled from "styled-components";

const SearchForm = ({ fetchFromGoogle }) => {
  const {
    onLoading,
    maxResults,
    searchTerm,
    searchAuthor,
    setMaxResults,
    setSearchTerm,
    setSearchAuthor,
    fetchAllBooksFromGoogle,
    fetchAllFavouriteBooks,
  } = useAppContext();

  const [reset, setReset] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSearchAuthor(formatSearchValues(searchAuthor));
      setSearchTerm(formatSearchValues(searchTerm));
      if (fetchFromGoogle) return await fetchAllBooksFromGoogle();
      await fetchAllFavouriteBooks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "author") setSearchAuthor(value);
    if (e.target.name === "title") setSearchTerm(value);
  };

  const resetSearch = () => {
    setSearchAuthor("");
    setSearchTerm("");
    setMaxResults(10);
    if (!fetchFromGoogle) setReset(true);
  };

  useEffect(() => {
    if (!fetchFromGoogle) {
      fetchAllFavouriteBooks();
      setReset(false);
    }
    // eslint-disable-next-line
  }, [reset]);

  return (
    <Wrapper>
      <form onSubmit={onSubmit} className="form">
        <select
          onChange={(e) => setMaxResults(parseInt(e.target.value))}
          value={maxResults}
        >
          {fetchLimit}
        </select>
        <CustomInput
          type="text"
          name="author"
          value={searchAuthor}
          handleChange={handleChange}
        />
        <CustomInput
          type="text"
          name="title"
          value={searchTerm}
          handleChange={handleChange}
        />
        <div className="btn-container">
          <button
            type="submit"
            className="submit-btn"
            onClick={(e) => onSubmit(e)}
            disabled={onLoading}
          >
            <SlMagnifier />
          </button>
          <button
            type="button"
            className="reset-btn"
            onClick={() => resetSearch()}
          >
            <SlClose />
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1rem 0 5rem 0;
  z-index: 1;

  .form {
    display: grid;
    width: 100%;
    padding: 0.5rem;
    gap: 1rem 0;
    select {
      cursor: pointer;
      outline-style: none;
      border: none;
      padding: 0.5rem;
      text-transform: uppercase;
      font-size: 1.15rem;
      letter-spacing: 2px;
      height: 45px;
      border-radius: 15px;
      transition: var(--transition);
    }
    input {
      text-transform: uppercase;
      font-size: 1.25rem;
      letter-spacing: 2px;
      width: 100%;
      height: 45px;
      padding: 0.5rem;
      border: none;
      border-radius: 15px;
      transition: var(--transition);
      &:focus {
        outline: none;
        background: lightgray;
      }
    }
  }

  .btn-container {
    display: flex;
    width: fit-content;
    gap: 0.5rem;
    justify-content: center;
    margin: 0 auto;
  }

  .submit-btn,
  .reset-btn {
    cursor: pointer;
    width: fit-content;
    margin: 0 auto;
    color: salmon;
    background: honeydew;
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 15px;
    transition: var(--transition);
    svg {
      font-size: 1.5rem;
    }
    &:hover {
      color: honeydew;
      background: salmon;
    }
  }

  .disabled {
    color: white;
    background: gray;
    opacity: 0.5;
  }

  @media screen and (min-width: 792px) {
    .form {
      width: 75%;
      grid-template-columns: auto 0.5fr 0.5fr auto;
      select {
        border-bottom-left-radius: 15px;
        border-top-left-radius: 15px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      input {
        border-radius: 0;
      }
    }

    .btn-container {
      gap: 0;
    }

    .reset-btn {
      border-top-right-radius: 15px;
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      padding: 0 1rem;
    }

    .submit-btn {
      border-right: solid 2px salmon;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      padding: 0 1rem;
    }
  }
`;

export default SearchForm;
