import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike"],
    ["blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    ["clean"],
  ],
};

const formats = [
  "link",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
];

const CustomTextArea = ({ value, handleChange, label }) => {
  return (
    <div className="form-input">
      {label && <label>{label}</label>}
      <ReactQuill
        theme="snow"
        onChange={handleChange}
        value={value}
        modules={modules}
        formats={formats}
        className="textarea"
      />
    </div>
  );
};

export default CustomTextArea;
