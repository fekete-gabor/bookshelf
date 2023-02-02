import { useAppContext } from "../context/app_context";

const CustomButton = ({ name, className, handleChange }) => {
  const { categoryName } = useAppContext();

  return (
    <button
      className={categoryName === name ? `${className} active-btn` : className}
      data-title={name}
      onClick={handleChange}
    >
      {name}
    </button>
  );
};

export default CustomButton;
