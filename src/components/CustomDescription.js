import { removeHTMLTags } from "../utils/removeHTMLTags";

const CustomDescription = ({
  fieldName = "",
  showFieldName = false,
  className,
  value = "",
}) => {
  if (Array.isArray(value)) {
    return (
      value && (
        <div className={`${className}-container`}>
          {showFieldName && <h4>{fieldName}</h4>}
          {value.map((item, i) => {
            return (
              <p key={i} className={className}>
                {item}
              </p>
            );
          })}
        </div>
      )
    );
  }

  return (
    value && (
      <div className={`${className}-container`}>
        {showFieldName && <h4>{fieldName}</h4>}
        {value && <p>{removeHTMLTags(value)}</p>}
      </div>
    )
  );
};

export default CustomDescription;
