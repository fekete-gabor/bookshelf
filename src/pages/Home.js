import { useState, useEffect } from "react";
import { CustomInput, CustomTextArea, Modal } from "../components";
import { useAppContext } from "../context/app_context";
import { IoIosNotificationsOff, IoIosNotifications } from "../utils/icons";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";

const Home = () => {
  const {
    isModal,
    openModal,
    showModalNotification,
    hideModalNotification,
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

  const message =
    "You have an unsaved field, if you continue it's values will be lost. Do you want to proceed?";

  const [currentInput, setCurrentInput] = useState({
    name: "",
    desc: "",
  });

  const { notification } = isModal;

  const changeTitle = async (e) => {
    try {
      const { name, desc } = currentInput;
      if (
        isFormVisible &&
        notification &&
        (name.length !== 0 || desc.length !== 0)
      ) {
        return await openModal(e.target.dataset.title);
      }
      await stopEditing();
      await hideForm();
      await changeCategory(e.target.dataset.title);
    } catch (error) {
      console.log(error);
    }
  };

  const addInput = () => {
    showForm();
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentInput({ name: "", desc: "" });
  }, [categoryName]);

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
        {notification ? (
          <IoIosNotificationsOff onClick={() => hideModalNotification()} />
        ) : (
          <IoIosNotifications onClick={() => showModalNotification()} />
        )}
      </div>
      <div>
        <h2>{categoryName}</h2>
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
      )}

      {inputList.map((input) => {
        const { category, inputs } = input;
        if (category === categoryName) {
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
                <button className="btn" onClick={() => editField(id)}>
                  edit
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
