import { CustomInput, CustomTextArea } from "./index";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";
import { useEffect } from "react";

const EditForm = ({ currentInput, setCurrentInput, setCurrentCategory }) => {
  const {
    isEditing,
    stopEditing,
    isFormVisible,
    hideForm,
    updateInputList,
    categoryName,
  } = useAppContext();

  const resetInput = async () => {
    try {
      await stopEditing();
      await hideForm();
      setCurrentInput({ name: "", desc: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    if (e?.target?.name !== undefined) {
      setCurrentInput({ ...currentInput, name: e.target.value });
    } else {
      setCurrentInput({ ...currentInput, desc: e });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
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
    const { desc } = currentInput;
    if (desc.startsWith("<p><br></p>") && !isEditing.status) {
      // Quill automatically injects a blank paragraph on render & on page load,
      // this useEffect replaces it with an empty value
      setCurrentInput({
        name: "",
        desc: currentInput.desc
          .replace(/(^([ ]*<p><br><\/p>)*)|((<p><br><\/p>)*[ ]*$)/gi, "")
          .trim(" "),
      });
    }
  }, [currentInput, setCurrentInput, isEditing.status]);

  if (isFormVisible) {
    return (
      <Wrapper>
        <form onSubmit={onSubmit}>
          <CustomInput
            type="text"
            name="name"
            label="name"
            handleChange={handleChange}
            value={currentInput.name}
          />
          <CustomTextArea
            type="text"
            name="desc"
            label="description"
            handleChange={handleChange}
            value={currentInput.desc}
          />
          <button
            className="btn"
            type="submit"
            disabled={
              currentInput.name.length === 0 || currentInput.desc.length === 0
            }
          >
            save
          </button>
          <button className="btn" type="button" onClick={() => resetInput()}>
            remove
          </button>
        </form>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  width: 100%;
  padding: 3rem;

  form {
    margin: 0 auto;
    width: 55%;
  }

  .form-input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    label,
    input {
      font-size: 1.5rem;
      letter-spacing: 3px;
      padding: 0.5rem;
    }
    input {
      width: 50%;
      border: solid 1px plum;
      border-radius: 15px;
      transition: var(--transition);
      outline: none;
      &:focus {
        border: solid 1px var(--primary-clr-2);
      }
    }
    .textarea {
      width: 75%;
      max-width: 700px;
      background-color: white;
      margin: 1rem 0;
    }
  }
`;

export default EditForm;
