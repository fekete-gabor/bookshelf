import { Link } from "react-router-dom";
import styled from "styled-components";

const Error = () => {
  return (
    <Wrapper>
      <div className="text-container">
        <h1>
          <span>404 </span>page not found
        </h1>
        <h2>the page you are looking for does not exist</h2>
        <h3>no worries though, you got plenty of options left</h3>
      </div>
      <div className="btn-container">
        <Link to="/search">
          <button className="btn">search for books</button>
        </Link>
        <Link to="/my-bookshelf">
          <button className="btn">check my favourite books</button>
        </Link>
        <Link to="/">
          <button className="btn">back to home page</button>
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  display: grid;
  text-align: center;

  .btn-container,
  .text-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #221440;
    span {
      color: #f29441;
    }
    h1 {
      color: #d097f5;
    }
    h2 {
      padding: 0.5rem;
    }
    h2,
    h3 {
      color: var(--primary-white);
    }
  }

  .btn-container {
    background: var(--primary-white);
  }

  .btn {
    background: #d097f5;
    margin: 0.5rem 0;
    font-size: clamp(1rem, 3vw, 2rem);
    &:hover {
      background: #221440;
    }
  }

  @media screen and (min-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default Error;
