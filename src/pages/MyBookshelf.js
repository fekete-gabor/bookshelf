import bg from "../assets/bg.jpg";
import { SearchForm, SearchFavouriteResults } from "../components";
import styled from "styled-components";

const MyBookshelfPage = () => {
  return (
    <Wrapper>
      <div
        className="bg"
        style={{ background: `url(${bg}) center/cover no-repeat` }}
      ></div>
      <SearchForm fetchFromGoogle={false} />
      <SearchFavouriteResults />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
  position: relative;

  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export default MyBookshelfPage;
