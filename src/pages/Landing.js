import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg from "../assets/landing_page_bg.svg";
import { Login, Register } from "../components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Landing = () => {
  const [form, setForm] = useState("login");
  const { user } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const { name, email } = user;
    if (name.length > 0 && email.length > 0) return navigate("/");
    // eslint-disable-next-line
  }, [user]);

  return (
    <Wrapper>
      <div className="img-container">
        <img src={bg} alt="main" />
      </div>
      <article>
        <div className="desc-container">
          <h3>Welcome to bookshelf_</h3>
          <p>
            If you are like me, who tends to forget what I was reading 2 pages
            ago, this app is for you!
          </p>
          <p>
            Add your favourite books to your shelf. Afterwards you can create
            custom categories & notes.
          </p>
        </div>
        <div className="form-container">
          {form === "login" ? (
            <Login form={form} setForm={setForm} />
          ) : (
            <Register form={form} setForm={setForm} />
          )}
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
      </article>
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

  article {
    display: grid;
    grid-template-rows: repeat(2, 0.5fr);
    height: 100%;
    max-width: 500px;
    gap: 1rem;
    z-index: 1;
  }

  .desc-container {
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0rem;
    text-align: center;
    background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55));
    z-index: 1;
    border-radius: 15px;
    gap: 1rem;
    h3,
    p {
      color: whitesmoke;
    }
    p {
      font-size: 1.2rem;
    }
  }

  .form-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
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

  @media screen and (min-width: 350px) {
    article {
      gap: 2rem;
    }

    .desc-container {
      padding: 2rem 1rem;
      gap: 2rem;
    }
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 60% 40%;
    place-content: unset;

    .img-container {
      position: unset;
    }

    article {
      height: fit-content;
    }

    .desc-container {
      background: transparent;
      box-shadow: 5px 5px 1px plum;
      h3,
      p {
        color: black;
      }
    }

    .form-container {
      height: 365px;
      background: transparent;
      box-shadow: 5px 5px 1px dodgerblue;
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
