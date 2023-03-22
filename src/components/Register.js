import { useState } from "react";
import axios from "axios";
import { alertMessages } from "../utils/alertMessages";
import { CustomInput } from "../components";

const Register = ({ form, setForm }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const APIUrl = process.env.REACT_APP_API_URL;

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
      const response = await axios.post(
        `${APIUrl}/api/v1/auth/register`,
        user,
        {
          withCredentials: true,
          xsrfHeaderName: "X-CSRFTOKEN",
          xsrfCookieName: "csrftoken",
        }
      );
      alertMessages("success", `${response.data.msg}`);
      setUser({ name: "", email: "", password: "" });
    } catch (error) {
      alertMessages("error", `${error.response.data}`);
      console.log(error.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>create new account</h3>
      <CustomInput
        type="text"
        name="name"
        value={user.name}
        handleChange={handleChange}
        required
      />
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
          type="button"
        >
          Log In
        </button>
        <button
          className={form === "register" ? "active-btn btn" : "btn"}
          onClick={() => setForm("register")}
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
