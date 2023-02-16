import { useState, useEffect } from "react";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const EditSavedFields = ({ setCurrentInput }) => {
  const {
    isModal,
    openModal,
    showForm,
    inputList,
    deleteInput,
    editInput,
    categoryName,
  } = useAppContext();
  const { notification, allActions } = isModal;

  const [buttonID, setButtonID] = useState(null);

  const message = "Are you sure you want to delete this field?";

  const handleChange = async (id) => {
    setButtonID(id);
    try {
      const payload = { message, actionType: "delete" };

      if (notification) return await openModal(payload);

      await deleteInput(id);
    } catch (error) {
      console.log(error);
    }
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

  useEffect(() => {
    if (allActions.delete) deleteInput(buttonID);
    // eslint-disable-next-line
  }, [allActions.delete]);

  return (
    <Wrapper>
      {inputList.map((input) => {
        const { category, inputs } = input;

        if (category === categoryName) {
          return inputs.map((field, i) => {
            const { id, name, desc } = field;

            return (
              <div className="container" key={i}>
                <article>
                  <h3>index : {id}</h3>
                  <h4>{name}</h4>
                  <div
                    style={{ overflowWrap: "break-word" }}
                    dangerouslySetInnerHTML={{ __html: desc }}
                  ></div>
                </article>
                <footer>
                  <button className="btn" onClick={() => handleChange(id)}>
                    delete
                  </button>
                  <button className="btn" onClick={() => editField(id)}>
                    edit
                  </button>
                </footer>
              </div>
            );
          });
        } else {
          return null;
        }
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 1rem 2rem;

  .container {
    background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
    height: fit-content;
    border-radius: 15px;
    padding: 0.5rem;
    margin: 0.25rem;

    article {
      width: 100%;
      blockquote {
        color: dodgerblue;
        margin: 0;
        padding-left: 3em;
        border-left: 0.5em dodgerblue dotted;
      }
    }

    footer {
      align-self: flex-end;
    }
  }

  @media screen and (min-width: 1300px) {
    display: grid;
    width: 75%;
  }
`;

export default EditSavedFields;
