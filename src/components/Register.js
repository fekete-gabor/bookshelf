import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomInput } from "../components";
import { useAppContext } from "../context/app_context";

const Register = ({ form, setForm }) => {
  const { saveUser } = useAppContext();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
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
      setUser({ name: "", email: "", password: "" });
      navigateHome();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <h3>create new account</h3>
      <CustomInput
        type="name"
        name="name"
        values={user.name}
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
