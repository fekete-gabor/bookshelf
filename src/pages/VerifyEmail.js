import { useEffect } from "react";
import bg from "../assets/verification_page_bg.svg";
import { useAppContext } from "../context/app_context";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const { verifyEmail } = useAppContext();
  const navigate = useNavigate();

  const verify = async () => {
    const verificationToken = searchParams.get("token");
    const email = searchParams.get("email");
    const payload = { verificationToken, email };
    await verifyEmail(payload);
    setTimeout(() => {
      navigate("/landing");
    }, 7000);
  };

  useEffect(() => {
    verify();
    // eslint-disable-next-line
  }, []);

  return (
    <Wrapper>
      <div className="bg-container">
        <img src={bg} alt="main" />
      </div>
      <article>
        <h1>thank you for registering!</h1>
        <h3>you'll be redirected to the log in page in 7 seconds</h3>
        <Link to="/landing">
          <button className="btn">log in</button>
        </Link>
      </article>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #f5f5f5;

  .bg-container {
    position: fixed;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }

  article {
    height: fit-content;
    max-width: 600px;
    padding: 2rem 0;
    border-radius: 15px;
    text-align: center;
    background: linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55));
    z-index: 1;

    h1,
    h3 {
      color: whitesmoke;
    }

    h3 {
      margin: 2rem 0;
    }

    button {
      font-size: 1.5rem;
    }
  }

  @media screen and (min-width: 350px) {
    article {
      padding: 2rem;
    }
    h1,
    h3 {
      letter-spacing: 3px;
    }
  }
`;

export default VerifyEmailPage;
