import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../components";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Login = () => {
  const { saveUser } = useAppContext();
  const [user, setUser] = useState({
    name: "",
  });

  const history = useNavigate();

  const navigateHome = () => {
    history("/");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveUser(user);
      setUser({ name: "" });
      navigateHome();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <CustomInput
          type="name"
          name="name"
          value={user.name}
          handleChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <h1>{user.name}</h1>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Login;
