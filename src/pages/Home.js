import axios from "axios";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Home = () => {
  const { removeUser } = useAppContext();

  const logout = async () => {
    await axios("/api/v1/auth/logout");
    await removeUser();
  };

  return (
    <Wrapper>
      <h2>home</h2>
      <button onClick={() => logout()}>log out</button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100vh;
`;

export default Home;
