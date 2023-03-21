import { useEffect } from "react";
import axios from "axios";
import { CustomInput, CustomTextArea } from "./index";
import { useAppContext } from "../context/app_context";
import { alertMessages } from "../utils/alertMessages";
import styled from "styled-components";

const EditForm = ({
  id,
  inputName,
  richText,
  setInputName,
  setRichText,
  setCurrentCategory,
}) => {
  const {
    isEditing,
    stopEditing,
    isFormVisible,
    hideForm,
    categoryName,
    getNotes,
  } = useAppContext();
  const APIUrl = process.env.REACT_APP_API_URL;

  const resetInput = async () => {
    try {
      await stopEditing();
      await hideForm();
      setInputName({ name: "" });
      setRichText({ desc: "" });
    } catch (error) {
      console.log(error);
    }
  };

  const inputNameHandleChange = (e) => {
    setInputName({ ...inputName, name: e.target.value });
  };

  const richTextHandleChange = (e) => {
    setRichText({ desc: e });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { status, id: editID } = isEditing;

      const url = !status
        ? `${APIUrl}/api/v1/edit/createNotes/${id}`
        : `${APIUrl}/api/v1/edit/${id}`;

      const payload = { categoryName, inputName, richText };

      let response = !status
        ? await axios.post(url, payload)
        : await axios.patch(url, { inputName, richText, editID, id });

      const { msg } = await response.data;
      alertMessages("success", msg);

      await getNotes(id, categoryName);
      await stopEditing();

      setInputName({ name: "" });
      setRichText({ desc: "" });
      setCurrentCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { desc } = richText;
    if (desc.startsWith("<p><br></p>") && !isEditing.status) {
      // Quill automatically injects a blank paragraph on render & on page load,
      // this useEffect replaces it with an empty value
      setRichText({
        desc: richText.desc
          .replace(/(^([ ]*<p><br><\/p>)*)|((<p><br><\/p>)*[ ]*$)/gi, "")
          .trim(" "),
      });
    }
  }, [richText, setRichText, isEditing.status]);

  if (isFormVisible) {
    return (
      <Wrapper>
        <form onSubmit={onSubmit}>
          <CustomInput
            type="text"
            name="name"
            label="name"
            handleChange={inputNameHandleChange}
            value={inputName.name}
          />
          <CustomTextArea
            type="text"
            name="desc"
            label="description"
            handleChange={richTextHandleChange}
            value={richText.desc}
          />
          <button
            className="btn"
            type="submit"
            disabled={inputName.name.length === 0 || richText.desc.length === 0}
          >
            save
          </button>
          <button className="btn" type="button" onClick={() => resetInput()}>
            close
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
    width: 100%;
    max-width: 650px;
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
      width: 100%;
      border: solid 1px plum;
      border-radius: 15px;
      transition: var(--transition);
      outline: none;
      &:focus {
        border: solid 1px var(--primary-clr-2);
      }
    }
    .textarea {
      width: 100%;
      max-width: 700px;
      background-color: white;
      margin: 1rem 0;
    }
  }

  @media screen and (min-width: 550px) {
    .form-input {
      input {
        width: 50%;
      }
    }
  }
`;

export default EditForm;
