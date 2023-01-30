const CustomTextArea = ({
  label,
  type,
  name,
  value,
  handleChange,
  required,
}) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea
        type={type}
        cols="50"
        rows="5"
        onChange={handleChange}
        name={name}
        value={value}
        required={required && required}
        placeholder={!label ? name : undefined}
      />
    </div>
  );
};

export default CustomTextArea;
