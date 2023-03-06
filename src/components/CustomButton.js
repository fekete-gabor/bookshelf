import { IoMdAdd, IoIosTrash } from "../utils/icons";
import { useAppContext } from "../context/app_context";

const CustomButton = ({ name, className, changeTitle, deleteField }) => {
  const { categoryName, showForm } = useAppContext();

  return (
    <div className="category-btn-container">
      <button
        className={
          categoryName === name ? `${className} active-btn` : className
        }
        data-title={name}
        onClick={changeTitle}
      >
        {name}
      </button>
      <IoMdAdd onClick={() => showForm()} className="add-icon" />
      <IoIosTrash onClick={() => deleteField()} className="delete-icon" />
    </div>
  );
};

export default CustomButton;
