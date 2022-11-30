import bg from "../assets/bg.jpg";
import { SearchForm, SearchResults } from "../components";
import styled from "styled-components";

const SearchPage = () => {
  return (
    <Wrapper>
      <div
        className="bg"
        style={{ background: `url(${bg}) center/cover no-repeat` }}
      ></div>
      <SearchForm />
      <SearchResults />
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

export default SearchPage;
