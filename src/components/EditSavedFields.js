import { useState, useEffect } from "react";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";
import parse from "html-react-parser";

const EditSavedFields = ({ id: bookID, setInputName, setRichText }) => {
  const {
    isModal,
    openModal,
    showForm,
    categoryName,
    deleteInput,
    editInput,
    favouriteBookEdits,
  } = useAppContext();
  const { notification, allActions } = isModal;

  const [buttonID, setButtonID] = useState(null);

  const message = "Are you sure you want to delete this field?";

  const deleteField = async (id) => {
    setButtonID(id);
    try {
      const payload = { message, actionType: "delete" };

      if (notification) return await openModal(payload);

      await deleteInput(bookID, id, categoryName);
    } catch (error) {
      console.log(error);
    }
  };

  const editField = async (e) => {
    try {
      const parentContainer = e.target.parentElement.parentElement;
      const parentID = parentContainer.dataset.id;
      const findInput = await favouriteBookEdits.find(
        (book) => book.id === parentID
      );
      let { id: editID, name, desc } = findInput;
      await showForm();
      await editInput(editID);

      setInputName({ name });
      setRichText({ desc: parse(desc) });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (allActions.delete) deleteInput(bookID, buttonID, categoryName);
    // eslint-disable-next-line
  }, [allActions.delete]);

  return (
    <Wrapper>
      {favouriteBookEdits &&
        favouriteBookEdits.map((edit, i) => {
          const { id, name, desc } = edit;
          return (
            <div className="notes-container" key={i} data-id={id}>
              <article>
                <h3>{i}</h3>
                <h4>{name}</h4>
                <div
                  style={{ overflowWrap: "break-word" }}
                  dangerouslySetInnerHTML={{ __html: parse(desc) }}
                ></div>
              </article>
              <footer>
                <button className="btn" onClick={() => deleteField(id)}>
                  delete
                </button>
                <button className="btn" onClick={(e) => editField(e)}>
                  edit
                </button>
              </footer>
            </div>
          );
        })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  padding: 1rem 2rem;

  .notes-container {
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1));
    height: fit-content;
    border: solid 1px rebeccapurple;
    border-radius: 15px;
    padding: 0.5rem;
    margin: 0.25rem;
    position: relative;
    h3 {
      padding: 0.5rem 1rem;
      position: absolute;
      top: 5px;
      left: 5px;
    }

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
