import { useEffect } from "react";
import { navLinks } from "../utils/navLinks";
import { useAppContext } from "../context/app_context";
import useMediaQuery from "../utils/mediaQuery";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";

const Sidebar = () => {
  const { isSidebar, closeSidebar } = useAppContext();
  const mediaQuery = useMediaQuery("(min-width: 792px)");

  useEffect(() => {
    if (mediaQuery) {
      closeSidebar();
    }
    // eslint-disable-next-line
  }, [mediaQuery]);

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    if (!isSidebar) {
      gsap.to(sidebar, { duration: 1, ease: "slow", x: "-100%" });
    } else {
      gsap.to(sidebar, { duration: 1, ease: "slow", x: "0%" });
    }
  }, [isSidebar]);

  return (
    <Wrapper>
      <div className="sidebar">
        <ul onClick={() => closeSidebar()}>{navLinks}</ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .sidebar {
    width: 100%;
    height: calc(100vh - 72px);
    position: fixed;
    z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #222;
    transform: translateX(-100%);
  }

  li {
    list-style: none;
    text-align: center;
    padding: 0.5rem 0;
    a {
      color: honeydew;
      font-size: 2rem;
      text-decoration: none;
      text-transform: capitalize;
      transition: var(--transition);
      &:hover {
        color: hotpink;
      }
    }
  }
`;

export default Sidebar;
