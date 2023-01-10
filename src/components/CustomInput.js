const CustomInput = ({
  addLabel,
  type,
  name,
  value,
  handleChange,
  required,
}) => {
  return (
    <div>
      {addLabel && <label htmlFor={name}>{name}</label>}
      <input
        type={type}
        onChange={handleChange}
        name={name}
        value={value && value.replaceAll("+", " ")}
        required={required && required}
        placeholder={required ? `${name}*` : name}
      />
    </div>
  );
};

export default CustomInput;
