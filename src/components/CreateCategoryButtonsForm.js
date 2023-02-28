import { useState } from "react";
import axios from "axios";
import { CustomInput } from "./index";
import { alertMessages } from "../utils/alertMessages";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const CreateCategoryButtonsForm = ({ id }) => {
  const { getAllCategories } = useAppContext();

  const [fieldName, setFieldName] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setFieldName({ ...fieldName, name: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `/api/v1/edit/createCategoryBtn/${id}`,
        fieldName
      );
      await getAllCategories(id);
      setFieldName({ name: "" });
      alertMessages("error", response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <CustomInput
          name="name"
          type="text"
          label="add field"
          value={fieldName.name}
          handleChange={handleChange}
        />
        <button className="btn save" type="submit">
          save
        </button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 0 0.5rem;

  input {
    display: grid;
    margin: 0.5rem auto;
    padding: 0.5rem 0.25rem;
  }

  label {
    font-size: 1.25rem;
  }

  .save {
    margin: 0;
    background: #222;
    color: yellow;
    border: solid 1px transparent;
    transition: var(--transition);
    &:hover {
      background: gold;
      color: #222;
      border: solid 1px #222;
    }
  }
`;

export default CreateCategoryButtonsForm;
