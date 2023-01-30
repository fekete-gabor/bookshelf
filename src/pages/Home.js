import { useState, useEffect } from "react";
import { CustomInput, CustomTextArea, Login } from "../components";
import styled from "styled-components";

const Home = () => {
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("places");
  const [formVisible, setFormVisible] = useState(false);
  const [inputList, setInputList] = useState([]);
  const [currentInput, setCurrentInput] = useState({
    id: 0,
    name: "",
    desc: "",
  });

  const changeTitle = (e) => {
    setTitle(e.target.dataset.title);
  };

  const addInput = () => {
    setFormVisible(true);
    setCurrentInput({ ...currentInput, id: counter });
  };

  const removeInput = (e) => {
    setFormVisible(false);
    setCurrentInput({ ...currentInput, name: "", desc: "" });
  };

  const deleteItem = (id) => {
    const newList = inputList.map((input) => {
      if (input.fieldName === title) {
        const obj = {
          ...input,
          inputs: input.inputs.filter((q) => q.id !== id),
        };
        return obj;
      } else {
        return input;
      }
    });
    setInputList([...newList]);
  };

  const handleChange = (e) => {
    setCurrentInput({ ...currentInput, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setCounter(counter + 1);
      if (inputList.length === 0) {
        setInputList([{ fieldName: title, inputs: [currentInput] }]);
        setCurrentInput({ ...currentInput, name: "", desc: "" });
        setFormVisible(false);
        return;
      }

      let findInput = inputList.find((input) => input.fieldName === title);

      if (!findInput) {
        setInputList([
          ...inputList,
          { fieldName: title, inputs: [currentInput] },
        ]);
        setCurrentInput({ ...currentInput, name: "", desc: "" });
        setFormVisible(false);
        return;
      }

      findInput = {
        ...findInput,
        inputs: [...findInput.inputs, findInput.inputs.push(currentInput)],
      };

      setInputList([...inputList]);
      setCurrentInput({ ...currentInput, name: "", desc: "" });
      setFormVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div>
        <button
          className="btn"
          data-title="places"
          onClick={(e) => changeTitle(e)}
        >
          places
        </button>
        <button
          className="btn"
          data-title="items"
          onClick={(e) => changeTitle(e)}
        >
          items
        </button>
        <button
          className="btn"
          data-title="dates"
          onClick={(e) => changeTitle(e)}
        >
          dates
        </button>
      </div>
      <div>
        <h2>{title}</h2>
      </div>
      {formVisible && (
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
          <button className="btn" type="button" onClick={(e) => removeInput(e)}>
            remove
          </button>
        </form>
      )}

      {inputList.map((input) => {
        const { fieldName, inputs } = input;
        if (fieldName === title) {
          return inputs.map((field) => {
            const { id, name, desc } = field;

            return (
              <div key={id}>
                <h3>{id}</h3>
                <h4>{name}</h4>
                <p>{desc}</p>
                <button className="btn" onClick={() => deleteItem(id)}>
                  delete
                </button>
              </div>
            );
          });
        }
      })}
      <div>
        <button
          className="btn"
          disabled={formVisible}
          onClick={() => addInput()}
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
`;

export default Home;
