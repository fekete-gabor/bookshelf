import { useState, useEffect } from "react";
import { CustomInput, CustomTextArea, Modal } from "../components";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";

const Home = () => {
  const {
    openModal,
    fieldTitle,
    changeFieldTitle,
    isFormVisible,
    showForm,
    hideForm,
    updateInputList,
    increaseCounter,
    inputList,
    deleteInput,
  } = useAppContext();

  const message =
    "You have an unsaved field, if you continue it's values will be lost. Do you want to proceed?";

  const [currentInput, setCurrentInput] = useState({
    name: "",
    desc: "",
  });

  const changeTitle = (e) => {
    if (!isFormVisible) return changeFieldTitle(e.target.dataset.title);
    openModal(e.target.dataset.title);
  };

  const addInput = () => {
    showForm();
  };

  const removeInput = () => {
    hideForm();
    setCurrentInput({ name: "", desc: "" });
  };

  const deleteField = (id) => {
    deleteInput(id);
  };

  const handleChange = (e) => {
    setCurrentInput({ ...currentInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await increaseCounter();
      await updateInputList({ fieldName: fieldTitle, inputs: [currentInput] });
      setCurrentInput({ name: "", desc: "" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentInput({ name: "", desc: "" });
  }, [fieldTitle]);

  return (
    <Wrapper>
      <div>
        <button
          className="btn ww"
          data-title="places"
          onClick={(e) => changeTitle(e)}
        >
          places
        </button>
        <button
          className="btn ww"
          data-title="items"
          onClick={(e) => changeTitle(e)}
        >
          items
        </button>
        <button
          className="btn ww"
          data-title="dates"
          onClick={(e) => changeTitle(e)}
        >
          dates
        </button>
      </div>
      <div>
        <h2>{fieldTitle}</h2>
      </div>
      {isFormVisible && (
        <form onSubmit={onSubmit}>
          <CustomInput
            type="text"
            name="name"
            handleChange={handleChange}
            value={currentInput.name}
          />
          <CustomTextArea
            type="text"
            name="desc"
            handleChange={handleChange}
            value={currentInput.desc}
          />
          <button className="btn" type="submit">
            save
          </button>
          <button className="btn" type="button" onClick={() => removeInput()}>
            remove
          </button>
        </form>
      )}

      {inputList.map((input) => {
        const { fieldName, inputs } = input;
        if (fieldName === fieldTitle) {
          return inputs.map((field) => {
            const { id, name, desc } = field;

            return (
              <div key={id}>
                <h3>{id}</h3>
                <h4>{name}</h4>
                <p>{desc}</p>
                <button className="btn" onClick={() => deleteField(id)}>
                  delete
                </button>
              </div>
            );
          });
        } else {
          return null;
        }
      })}
      <div>
        <button
          className="btn"
          disabled={isFormVisible}
          onClick={() => addInput()}
        >
          add
        </button>
      </div>
      <Modal text={message} />
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
`;

export default Home;
