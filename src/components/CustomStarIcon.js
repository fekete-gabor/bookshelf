import { AiFillStar, AiOutlineStar } from "../utils/icons";

const CustomStarIcon = ({ handleChange, userRating }) => {
  const temp = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;

    return (
      <span key={index} data-index={index + 1}>
        {userRating > number && userRating !== 0 ? (
          <AiFillStar onClick={(e) => handleChange(e)} data-index={index + 1} />
        ) : (
          <AiOutlineStar
            onClick={(e) => handleChange(e)}
            data-index={index + 1}
          />
        )}
      </span>
    );
  });

  return <div className="star-icon-container">{temp}</div>;
};

export default CustomStarIcon;
