import bg from "../assets/bg.jpg";
import { SingleBook } from "../components";
import styled from "styled-components";

const SingleBookPage = () => {
  return (
    <Wrapper>
      <div
        className="bg"
        style={{ background: `url(${bg}) center/cover no-repeat` }}
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
