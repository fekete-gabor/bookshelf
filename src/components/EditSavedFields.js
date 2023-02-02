import { useState, useEffect } from "react";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const EditSavedFields = ({ deleteField, editField }) => {
  const { isModal, openModal, inputList, categoryName } = useAppContext();
  const { remove } = isModal;

  const [buttonID, setButtonID] = useState(null);

  const message = "Are you sure to delete this field?";

  const handleChange = async (id) => {
    try {
      setButtonID(id);
      const payload = { message, actionType: "remove" };
      await openModal(payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (remove) deleteField(buttonID);
  }, [remove]);

  return inputList.map((input) => {
    const { category, inputs } = input;

    if (category === categoryName) {
      return inputs.map((field) => {
        const { id, name, desc } = field;

        return (
          <Wrapper key={id}>
            <div>
              <h3>{id}</h3>
              <h4>{name}</h4>
              <p>{desc}</p>
              <button className="btn" onClick={() => handleChange(id)}>
                delete
              </button>
              <button className="btn" onClick={() => editField(id)}>
                edit
              </button>
            </div>
          </Wrapper>
        );
      });
    } else {
      return null;
    }
  });
};

const Wrapper = styled.div`
  width: 75%;
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  border-radius: 15px;
  padding: 2rem;
`;

export default EditSavedFields;
