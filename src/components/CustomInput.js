const CustomInput = ({ addLabel, type, name, value, handleChange }) => {
  return (
    <div>
      {addLabel && <label htmlFor={name}>{name}</label>}
      <input
        type={type}
        onChange={handleChange}
        name={name}
        value={value && value.replaceAll("+", " ")}
        placeholder={name}
      />
    </div>
  );
};

export default CustomInput;
