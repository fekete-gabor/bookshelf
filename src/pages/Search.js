import { useEffect } from "react";
import bgArray from "../utils/bgs";
import { useAppContext } from "../context/app_context";
import { SearchForm, SearchResults } from "../components";
import styled from "styled-components";

const SearchPage = () => {
  const { fetchAllBooksFromGoogle, fetchUniqueIDs, bgIndex } = useAppContext();

  const handleChange = async () => {
    try {
      await fetchAllBooksFromGoogle();
      await fetchUniqueIDs();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleChange();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <div
        className="bg"
        style={{
          background: `url(${bgArray[bgIndex]}) center/cover no-repeat`,
        }}
      ></div>
      <SearchForm fetchFromGoogle={true} />
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
