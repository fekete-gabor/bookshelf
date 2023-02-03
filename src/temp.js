import { useState, useEffect } from "react";
import { EditCategoryButtons, EditForm, EditSavedFields } from "../components";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Home = () => {
  const {
    isModal,
    openModal,
    categoryName,
    changeCategory,
    isFormVisible,
    showForm,
    hideForm,
    updateInputList,
    increaseCounter,
    inputList,
    deleteInput,
    editInput,
    stopEditing,
  } = useAppContext();

  const [currentInput, setCurrentInput] = useState({
    name: "",
    desc: "",
  });
  const [currentCategory, setCurrentCategory] = useState("");

  const message =
    "You have an unsaved field, if you continue it's values will be lost. Do you want to proceed?";

  const { notification } = isModal;

  const changeTitle = async (e) => {
    try {
      const { name, desc } = currentInput;
      if (
        isFormVisible &&
        notification &&
        (name.length !== 0 || desc.length !== 0)
      ) {
        setCurrentCategory(e.target.dataset.title);
        return await openModal({ message, actionType: "changeCategory" });
      }

      await hideForm();
      await stopEditing();
      await changeCategory(e.target.dataset.title);
    } catch (error) {
      console.log(error);
    }
  };

  const resetInput = async () => {
    try {
      await stopEditing();
      await hideForm();
      setCurrentInput({ name: "", desc: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteField = (id) => {
    deleteInput(id);
  };

  const editField = async (id) => {
    try {
      const findCategory = await inputList.find(
        (input) => input.category === categoryName
      );

      const { inputs } = findCategory;

      const findInput = await inputs.find((input) => input.id === id);

      const { name, desc } = findInput;

      setCurrentInput({ name, desc });
      await showForm();
      await editInput(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCurrentInput({ ...currentInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await increaseCounter();
      await updateInputList({
        category: categoryName,
        inputs: [currentInput],
      });
      setCurrentInput({ name: "", desc: "" });
      setCurrentCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentInput({ name: "", desc: "" });
    setCurrentCategory("");
  }, [categoryName]);

  useEffect(() => {
    if (isModal.changeCategory) {
      hideForm();
      stopEditing();
      changeCategory(currentCategory);
    }
    // eslint-disable-next-line
  }, [isModal.changeCategory]);

  return (
    <Wrapper>
      <EditCategoryButtons handleChange={changeTitle} />
      <EditForm
        isFormVisible={isFormVisible}
        onSubmit={onSubmit}
        handleChange={handleChange}
        currentInput={currentInput}
        resetInput={resetInput}
      />
      <EditSavedFields deleteField={deleteField} editField={editField} />
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

export default Home;
