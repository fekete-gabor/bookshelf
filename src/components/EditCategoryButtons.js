import { CustomButton } from "./index";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const BookCategoryButtons = ({ currentInput, setCurrentCategory }) => {
  const {
    isModal,
    openModal,
    changeCategory,
    isFormVisible,
    hideForm,
    stopEditing,
  } = useAppContext();

  const message =
    "You have an unsaved field, if you continue it's values will be lost. Do you want to proceed?";

  const { notification } = isModal;

  const changeTitle = async (e) => {
    try {
      const { name, desc } = currentInput;
      if (
        isFormVisible &&
        notification &&
        (name.length !== 0 || desc.length !== 0)
      ) {
        setCurrentCategory(e.target.dataset.title);
        return await openModal({ message, actionType: "changeCategory" });
      }

      await hideForm();
      await stopEditing();
      await changeCategory(e.target.dataset.title);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <CustomButton name="places" className="btn" handleChange={changeTitle} />
      <CustomButton
        name="characters"
        className="btn"
        handleChange={changeTitle}
      />
      <CustomButton
        name="chapters"
        className="btn"
        handleChange={changeTitle}
      />
      <CustomButton name="items" className="btn" handleChange={changeTitle} />
      <CustomButton
        name="definitions"
        className="btn"
        handleChange={changeTitle}
      />
      <CustomButton name="dates" className="btn" handleChange={changeTitle} />
      <CustomButton name="events" className="btn" handleChange={changeTitle} />
      <CustomButton
        name="factions"
        className="btn"
        handleChange={changeTitle}
      />
      <CustomButton
        name="my rating"
        className="btn"
        handleChange={changeTitle}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  text-align: center;
  .active-btn {
    background: yellowgreen;
  }
`;
export default BookCategoryButtons;
