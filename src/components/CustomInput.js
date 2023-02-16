const CustomInput = ({ label, type, name, value, handleChange, required }) => {
  return (
    <div className="form-input">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        onChange={handleChange}
        name={name}
        value={value && value.replaceAll("+", " ")}
        required={required && required}
        placeholder={!label ? name : undefined}
      />
    </div>
  );
};

export default CustomInput;
