import { useEffect } from "react";
import { HowToUse } from "../components";
import styled from "styled-components";
import { useAppContext } from "../context/app_context";

const Home = () => {
  const { showCurrentUser } = useAppContext();

  useEffect(() => {
    showCurrentUser();
  }, []);

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
