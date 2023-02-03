import { CustomInput, CustomTextArea } from "./index";
import { useAppContext } from "../context/app_context";

const EditForm = ({ currentInput, setCurrentInput, setCurrentCategory }) => {
  const {
    stopEditing,
    isFormVisible,
    hideForm,
    updateInputList,
    increaseCounter,
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
      setCurrentCategory("");
    } catch (error) {
      console.log(error);
    }
  };

  if (isFormVisible) {
    return (
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
    );
  }
};

export default EditForm;
