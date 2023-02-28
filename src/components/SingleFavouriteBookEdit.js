import { useState, useEffect } from "react";
import {
  EditCategoryButtons,
  CreateCategoryButtonsForm,
  EditForm,
  EditSavedFields,
} from "../components";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const SingleFavouriteBookEdit = ({ id }) => {
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
        <EditCategoryButtons
          id={id}
          inputName={inputName}
          richText={richText}
          setCurrentCategory={setCurrentCategory}
        />
        <div className="underline"></div>
        <CreateCategoryButtonsForm id={id} />
        <div>
          <button
            className="btn add-btn"
            disabled={isFormVisible || categoryName.length === 0}
            onClick={() => showForm()}
          >
            add
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
          setInputName={setInputName}
          setRichText={setRichText}
        />
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  aside {
    display: grid;
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
    margin: 0.5rem 0 0.5rem 0.5rem;
    width: 100%;
    height: 2.5px;
    background: goldenrod;
  }

  @media screen and (min-width: 1300px) {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: flex-start;

    aside {
      display: grid;
      position: sticky;
      top: 50%;
      transform: translateY(-50%);
      width: fit-content;
      height: fit-content;
    }

    .add-btn {
      display: none;
    }
  }
`;

export default SingleFavouriteBookEdit;
