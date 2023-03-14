import bgArray from "../utils/bgs";
import { useAppContext } from "../context/app_context";
import { SearchForm, SearchFavouriteResults } from "../components";
import styled from "styled-components";

const MyBookshelfPage = () => {
  const { bgIndex } = useAppContext();

  return (
    <Wrapper>
      <div
        className="bg"
        style={{
          background: `url(${bgArray[bgIndex]}) center/cover no-repeat`,
        }}
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
