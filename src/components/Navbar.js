import { navLinks } from "../utils/navLinks";
import { FaBars, FaWindowClose } from "../utils/icons";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Navbar = () => {
  const { isSidebar, openSidebar, closeSidebar } = useAppContext();

  return (
    <Wrapper className="navbar">
      <div>
        <Link to="/" className="brand" onClick={() => closeSidebar()}>
          bookshelf_
        </Link>
      </div>
      <div>
        <ul>{navLinks}</ul>
      </div>
      <div>
        {!isSidebar ? (
          <FaBars onClick={() => openSidebar()} />
        ) : (
          <FaWindowClose onClick={() => closeSidebar()} />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: sticky;
  top: 0;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-auto-flow: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
  background: whitesmoke;
  box-shadow: 1px 1px 5px #222;
  z-index: 999;
  transition: var(--transition);

  &:hover {
    box-shadow: 2px 2px 10px #222;
  }

  div {
    padding: 1.5rem;
  }

  .brand {
    cursor: pointer;
    text-transform: uppercase;
    text-decoration: none;
    color: #222;
    transition: var(--transition);
    &:hover {
      color: hotpink;
    }
  }

  ul {
    display: none;
  }

  .active-link {
    transition: var(--transition);
    text-decoration: underline var(--primary-clr-1) 3px;
  }

  svg {
    cursor: pointer;
    font-size: 1.5rem;
    display: block;
    transition: var(--transition);
    &:hover {
      color: hotpink;
    }
  }

  @media screen and (min-width: 792px) {
    ul {
      display: flex;
      justify-content: center;
      gap: 2rem;
      li {
        list-style: none;
        a {
          color: #222;
          text-decoration: none;
          text-transform: capitalize;
        }
      }
    }

    svg {
      display: none;
    }
  }
`;

export default Navbar;
