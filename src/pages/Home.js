import axios from "axios";
import { alertMessages } from "../utils/alertMessages";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Home = () => {
  const { removeUser } = useAppContext();

  const logout = async () => {
    try {
      const response = await axios.delete("/api/v1/auth/logout");
      await removeUser();
      alertMessages("success", `${response.data}`);
    } catch (error) {
      console.log(error.response.data);
    }
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
