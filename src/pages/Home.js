import { HowToUse } from "../components";
import styled from "styled-components";

const Home = () => {
  return (
    <Wrapper>
      <HowToUse />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  min-height: 100vh;
`;

export default Home;
