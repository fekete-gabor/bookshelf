import { CustomInput, CustomTextArea } from "./index";

const EditForm = ({
  isFormVisible,
  onSubmit,
  handleChange,
  currentInput,
  resetInput,
}) => {
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
