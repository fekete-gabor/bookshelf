import { IoMdAdd } from "../utils/icons";
import { useAppContext } from "../context/app_context";

const CustomButton = ({ name, className, handleChange }) => {
  const { categoryName, showForm } = useAppContext();

  return (
    <div className="category-btn-container">
      <button
        className={
          categoryName === name ? `${className} active-btn` : className
        }
        data-title={name}
        onClick={handleChange}
      >
        {name}
      </button>
      <IoMdAdd onClick={() => showForm()} className="add-icon" />
    </div>
  );
};

export default CustomButton;
