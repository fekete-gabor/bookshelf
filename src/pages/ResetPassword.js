import { useState } from "react";
import bg from "../assets/reset_password_page_bg.svg";
import axios from "axios";
import { alertMessages } from "../utils/alertMessages";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CustomInput } from "../components";
import styled from "styled-components";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = searchParams.get("token");
      const email = searchParams.get("email");
      const { newPassword, confirmPassword } = user;
      const payload = { token, email, newPassword, confirmPassword };
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/resetPassword",
        payload
      );
      setUser({ newPassword: "", confirmPassword: "" });
      alertMessages("success", `${response.data.msg}`);
      setTimeout(() => {
        navigate("/");
      }, 7000);
    } catch (error) {
      console.log(error);
      alertMessages("error", `${error.response.data.msg}`);
    }
  };

  return (
    <Wrapper>
      <div className="img-container">
        <img src={bg} alt="main" />
      </div>
      <div className="form-container">
        <form onSubmit={onSubmit}>
          <CustomInput
            label="new password"
            type="password"
            name="newPassword"
            value={user.value}
            handleChange={handleChange}
            required
          />
          <CustomInput
            label="confirm password"
            type="password"
            name="confirmPassword"
            value={user.value}
            handleChange={handleChange}
            required
          />
          <button className="btn" type="submit">
            submit
          </button>
          <Link to="/landing">
            <button className="btn" type="btn">
              back to log in
            </button>
          </Link>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: grid;
  place-content: center;
  align-items: center;
  background: whitesmoke;

  .img-container {
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    background: rgb(171, 196, 219);
    background: -moz-linear-gradient(
      90deg,
      rgba(171, 196, 219, 1) 50%,
      rgba(245, 245, 245, 1) 100%
    );
    background: -webkit-linear-gradient(
      90deg,
      rgba(171, 196, 219, 1) 50%,
      rgba(245, 245, 245, 1) 100%
    );
    background: linear-gradient(
      90deg,
      rgba(171, 196, 219, 1) 50%,
      rgba(245, 245, 245, 1) 100%
    );
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#abc4db",endColorstr="#f5f5f5",GradientType=1);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .form-container {
    height: fit-content;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55));
    z-index: 1;
    h3 {
      margin-bottom: 2rem;
      color: whitesmoke;
    }
  }

  .btn-container {
    text-align: center;
    margin: 1rem 0;
  }

  .btn {
    color: whitesmoke;
    background: var(--primary-clr-3);
  }

  a {
    color: whitesmoke;
  }

  input {
    display: grid;
    width: 100%;
    max-width: 500px;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    margin: 0.75rem auto;
    border-radius: 15px;
    border: solid 0.5px #222;
  }

  label {
    font-size: 1.25rem;
    color: whitesmoke;
  }

  @media screen and (min-width: 950px) {
    grid-template-columns: 60% 40%;
    place-content: unset;

    .img-container {
      position: unset;
    }

    .form-container {
      background: whitesmoke;
      h3 {
        color: black;
      }
    }

    label {
      color: #222;
    }

    a {
      color: var(--primary-clr-3);
    }
  }
`;

export default ResetPassword;
