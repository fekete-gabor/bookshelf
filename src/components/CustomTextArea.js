import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
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
