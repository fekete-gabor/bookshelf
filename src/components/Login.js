import { useState } from "react";
import axios from "axios";
import { alertMessages } from "../utils/alertMessages";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../components";
import { useAppContext } from "../context/app_context";

const Login = ({ form, setForm }) => {
  const { isLoading, saveUser } = useAppContext();
  const APIUrl = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate();

  const navigateHome = () => {
    history("/");
  };

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    // set email field value to lowercase
    if (inputName === "email") {
      return setUser({
        ...user,
        [inputName]: inputValue.toLowerCase(),
      });
    }

    setUser({ ...user, [inputName]: inputValue });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${APIUrl}/api/v1/auth/login`, user, {
        withCredentials: true,
        credentials: "include",
      });
      const { name } = await response.data.user;
      await saveUser({ user: response.data.user });
      alertMessages("success", `Welcome back ${name}!`);
      setUser({ email: "", password: "" });
      navigateHome();
    } catch (error) {
      console.log(error);
      alertMessages("warning", `${error.response.data}`);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>log in to your account</h3>
      <CustomInput
        type="email"
        name="email"
        value={user.email}
        handleChange={handleChange}
        required
      />
      <CustomInput
        type="password"
        name="password"
        value={user.password}
        handleChange={handleChange}
        required
      />
      <div className="btn-container">
        <button
          className={form === "login" ? "active-btn btn" : "btn"}
          onClick={() => setForm("login")}
          type="submit"
          disabled={isLoading}
        >
          Log In
        </button>
        <button
          className={form === "register" ? "active-btn btn" : "btn"}
          onClick={() => setForm("register")}
          type="button"
          disabled={isLoading}
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Login;
