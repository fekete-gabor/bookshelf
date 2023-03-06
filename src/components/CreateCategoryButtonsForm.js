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
      await axios.post(`/api/v1/edit/createCategory/${id}`, fieldName);
      await getAllCategories(id);
      setFieldName({ name: "" });
    } catch (error) {
      console.log(error);
      alertMessages("error", error.response.data);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={onSubmit}>
        <CustomInput
          name="name"
          type="text"
          label="add category"
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
    border: solid 1px slategrey;
    border-radius: 15px;
    padding: 0.5rem 0.75rem;
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

  @media screen and (min-width: 1300px) {
    text-align: left;

    input {
      margin: 0.5rem 0;
      width: 100%;
    }
  }
`;

export default CreateCategoryButtonsForm;
