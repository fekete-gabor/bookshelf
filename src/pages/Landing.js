import { Link } from "react-router-dom";
import styled from "styled-components";

const Landing = () => {
  return (
    <Wrapper>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  background-color: beige;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  align-items: center;
  font-size: 5rem;
`;

export default Landing;
