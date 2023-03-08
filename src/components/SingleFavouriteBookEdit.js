import { useState, useEffect } from "react";
import {
  EditCategoryButtons,
  CreateCategoryButtonsForm,
  EditForm,
  EditSavedFields,
  SingleFavouriteBookRating,
} from "../components";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const SingleFavouriteBookEdit = ({ id, authors, title }) => {
  const {
    isModal,
    categoryName,
    changeCategory,
    isFormVisible,
    showForm,
    hideForm,
    stopEditing,
    getNotes,
  } = useAppContext();

  const [currentCategory, setCurrentCategory] = useState("");
  const [inputName, setInputName] = useState({ name: "" });
  const [richText, setRichText] = useState({ desc: "" });
  const { allActions } = isModal;

  useEffect(() => {
    setInputName({ name: "" });
    setRichText({ desc: "" });
    setCurrentCategory("");
    // eslint-disable-next-line
  }, [categoryName]);

  useEffect(() => {
    if (allActions.changeCategory) {
      getNotes(id, currentCategory);
      hideForm();
      stopEditing();
      changeCategory(currentCategory);
    }
    // eslint-disable-next-line
  }, [allActions.changeCategory]);

  return (
    <Wrapper>
      <aside>
        <article className="edit-title-container">
          <h4>now editing:</h4>
          {authors.map((author, i) => {
            return (
              <h4 key={i}>
                {author}
                {authors.length - 1 === i ? null : ","}
              </h4>
            );
          })}
          <p>- {title}</p>
        </article>
        <div className="underline"></div>
        <SingleFavouriteBookRating id={id} />
        <div className="underline"></div>
        <CreateCategoryButtonsForm id={id} />
        <div className="underline"></div>
        <EditCategoryButtons
          id={id}
          inputName={inputName}
          richText={richText}
          setCurrentCategory={setCurrentCategory}
        />
        <div className="underline last-ul"></div>
        <div>
          <button
            className="btn add-btn"
            disabled={isFormVisible || categoryName.length === 0}
            onClick={() => showForm()}
          >
            add note
          </button>
        </div>
      </aside>
      <main>
        <EditForm
          id={id}
          inputName={inputName}
          richText={richText}
          setInputName={setInputName}
          setRichText={setRichText}
          setCurrentCategory={setCurrentCategory}
        />
        <EditSavedFields
          id={id}
          setInputName={setInputName}
          setRichText={setRichText}
        />
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  overflow-x: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  aside {
    display: grid;
  }

  .edit-title-container {
    display: grid;
    text-align: center;
    padding: 0 1rem;
    margin: 0 auto;
    max-width: 300px;
    h4:first-of-type {
      color: #222;
    }
    h4 {
      margin: 0 0 0.5rem 0;
      color: dodgerblue;
    }
  }

  main {
    width: 100%;
  }

  button:disabled {
    cursor: not-allowed;
    background: grey;
  }

  .add-btn {
    background: goldenrod;
    display: block;
    margin: 1rem auto;
    &:hover {
      color: #222;
      background: #fc3;
    }
  }

  svg {
    cursor: pointer;
    font-size: 1.5rem;
    transition: var(--transition);
    color: orangered;
    &:hover {
      color: red;
    }
  }

  .underline {
    overflow: hidden;
    margin: 1.5rem auto;
    width: 45vw;
    height: 2px;
    background: #999;
  }

  .last-ul {
    display: block;
  }

  @media screen and (min-width: 1300px) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    overflow-x: unset;

    aside {
      overflow-y: scroll;
      overflow-x: hidden;
      display: grid;
      position: sticky;
      top: 55%;
      transform: translateY(-50%);
      width: fit-content;
      padding-right: 2rem;
      max-height: 680px;

      ::-webkit-scrollbar {
        width: 2px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #999;
        border-radius: 10px;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: orangered;
      }
    }

    .edit-title-container {
      text-align: left;
      margin: 0;
    }

    .underline {
      width: 120%;
    }

    .last-ul {
      display: none;
    }

    .add-btn {
      display: none;
    }
  }
`;

export default SingleFavouriteBookEdit;
