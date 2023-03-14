import bgArray from "../utils/bgs";
import { useAppContext } from "../context/app_context";
import { SingleBook } from "../components";
import styled from "styled-components";

const SingleBookPage = () => {
  const { bgIndex } = useAppContext();

  return (
    <Wrapper>
      <div
        className="bg"
        style={{
          background: `url(${bgArray[bgIndex]}) center/cover no-repeat`,
        }}
      ></div>
      <SingleBook />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;

  .bg {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export default SingleBookPage;
