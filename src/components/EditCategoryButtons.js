import { CustomButton } from "./index";
import styled from "styled-components";

const BookCategoryButtons = ({ handleChange }) => {
  return (
    <Wrapper>
      <CustomButton name="places" className="btn" handleChange={handleChange} />
      <CustomButton
        name="characters"
        className="btn"
        handleChange={handleChange}
      />
      <CustomButton
        name="chapters"
        className="btn"
        handleChange={handleChange}
      />
      <CustomButton name="items" className="btn" handleChange={handleChange} />
      <CustomButton
        name="definitions"
        className="btn"
        handleChange={handleChange}
      />
      <CustomButton name="dates" className="btn" handleChange={handleChange} />
      <CustomButton name="events" className="btn" handleChange={handleChange} />
      <CustomButton
        name="factions"
        className="btn"
        handleChange={handleChange}
      />
      <CustomButton
        name="my rating"
        className="btn"
        handleChange={handleChange}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .active-btn {
    background: yellowgreen;
  }
`;
export default BookCategoryButtons;
