import { useState } from "react";
import axios from "axios";
import bg from "../assets/forgot_password_page_bg.svg";
import { alertMessages } from "../utils/alertMessages";
import { CustomInput } from "../components";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ForgotPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setUser({ ...user, [inputName]: inputValue.toLowerCase() });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/forgotPassword",
        user
      );
      setUser({ email: "" });
      alertMessages("success", `${response.data.msg}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <div className="img-container">
        <img src={bg} alt="main" />
      </div>
      <div className="form-container">
        <form onSubmit={onSubmit} className="form-container">
          <h3>reset password</h3>
          <CustomInput
            type="email"
            name="email"
            value={user.email}
            handleChange={handleChange}
            required
          />
          <button className="btn">Submit</button>
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
      background: transparent;
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

export default ForgotPassword;
