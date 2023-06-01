import styled from "styled-components";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <Wrapper>
      <p>
        &copy; {date} <span>bookshelf_</span>, all rights reserved. created by{" "}
        <span className="heart">&hearts;</span>{" "}
        <a href="https://feketegabor.dev/" target="_blank" rel="noreferrer">
          Gábor Fekete
        </a>
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: #222;
  text-transform: capitalize;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    font-size: 1.25rem;
    color: whitesmoke;
  }
  a {
    color: hotpink;
  }

  .heart {
    color: goldenrod;
  }
`;

export default Footer;
