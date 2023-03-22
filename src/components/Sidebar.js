import { useEffect } from "react";
import axios from "axios";
import { alertMessages } from "../utils/alertMessages";
import { navLinks } from "../utils/navLinks";
import { useAppContext } from "../context/app_context";
import useMediaQuery from "../utils/mediaQuery";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";

const Sidebar = () => {
  const { removeUser, isSidebar, closeSidebar } = useAppContext();
  const mediaQuery = useMediaQuery("(min-width: 792px)");
  const APIUrl = process.env.REACT_APP_API_URL;

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

  const logout = async () => {
    try {
      const response = await axios.delete(`${APIUrl}/api/v1/auth/logout`, {
        withCredentials: true,
        xsrfHeaderName: "X-CSRFTOKEN",
        xsrfCookieName: "csrftoken",
      });
      await removeUser();
      alertMessages("success", `${response.data}`);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Wrapper>
      <div className="sidebar">
        <ul onClick={() => closeSidebar()}>
          {navLinks}
          <li>
            <p onClick={() => logout()}>logout</p>
          </li>
        </ul>
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
    cursor: pointer;
    list-style: none;
    text-align: center;
    padding: 0.5rem 0;
    a,
    p {
      color: honeydew;
      font-size: 2rem;
      text-decoration: none;
      text-transform: capitalize;
      transition: var(--transition);
      &:hover {
        color: hotpink;
      }
    }
    p {
      color: tomato;
      &:hover {
        color: red;
      }
    }
  }
`;

export default Sidebar;
