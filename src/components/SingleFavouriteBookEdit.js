import { useState, useEffect } from "react";
import { EditCategoryButtons, EditForm, EditSavedFields } from "../components";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const SingleFavouriteBookEdit = () => {
  const {
    isModal,
    categoryName,
    changeCategory,
    isFormVisible,
    showForm,
    hideForm,
    stopEditing,
  } = useAppContext();

  const [currentCategory, setCurrentCategory] = useState("");
  const [currentInput, setCurrentInput] = useState({
    name: "",
    desc: "",
  });

  const { allActions } = isModal;

  useEffect(() => {
    setCurrentInput({ name: "", desc: "" });
    setCurrentCategory("");
  }, [categoryName]);

  useEffect(() => {
    if (allActions.changeCategory) {
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
          currentInput={currentInput}
          setCurrentCategory={setCurrentCategory}
        />
        <div>
          <button
            className="btn add-btn"
            disabled={isFormVisible}
            onClick={() => showForm()}
          >
            add
          </button>
        </div>
      </aside>
      <main>
        <EditForm
          currentInput={currentInput}
          setCurrentInput={setCurrentInput}
          setCurrentCategory={setCurrentCategory}
        />
        <EditSavedFields setCurrentInput={setCurrentInput} />
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
