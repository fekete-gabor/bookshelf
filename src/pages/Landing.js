import { useState } from "react";
import { Link } from "react-router-dom";
import landing_page_bg from "../assets/landing_page_bg.svg";
import { Login, Register } from "../components";
import styled from "styled-components";

const Landing = () => {
  const [form, setForm] = useState("login");

  return (
    <Wrapper>
      <div className="img-container">
        <img src={landing_page_bg} alt="asd" />
      </div>
      <div className="form-container">
        {form === "login" ? (
          <Login form={form} setForm={setForm} />
        ) : (
          <Register form={form} setForm={setForm} />
        )}
        <Link to="/forgot-password">Forgot your password?</Link>
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

  .active-btn {
    color: whitesmoke;
    background: green;
  }

  input {
    width: 100%;
    max-width: 500px;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
    margin: 0.25rem 0;
    border-radius: 15px;
    border: solid 0.5px #222;
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

    .btn {
      color: var(--primary-clr-3);
      background: transparent;
      border: solid 1px var(--primary-clr-3);
    }

    .active-btn {
      color: whitesmoke;
      background: var(--primary-clr-3);
    }

    a {
      color: var(--primary-clr-3);
    }
  }
`;

export default Landing;
