import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
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
