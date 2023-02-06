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
      <EditCategoryButtons
        currentInput={currentInput}
        setCurrentCategory={setCurrentCategory}
      />
      <EditForm
        currentInput={currentInput}
        setCurrentInput={setCurrentInput}
        setCurrentCategory={setCurrentCategory}
      />
      <EditSavedFields setCurrentInput={setCurrentInput} />
      <div>
        <button
          className="btn"
          disabled={isFormVisible}
          onClick={() => showForm()}
        >
          add
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  button:disabled {
    cursor: not-allowed;
    background: grey;
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
`;

export default SingleFavouriteBookEdit;
