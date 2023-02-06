import { navLinks } from "../utils/navLinks";
import axios from "axios";
import { alertMessages } from "../utils/alertMessages";
import {
  FaBars,
  FaWindowClose,
  ImExit,
  IoIosNotifications,
  IoIosNotificationsOff,
} from "../utils/icons";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Navbar = () => {
  const { user, isSidebar, openSidebar, closeSidebar, isModal } =
    useAppContext();
  const { notification } = isModal;
  const { removeUser } = useAppContext();

  const logout = async () => {
    try {
      const response = await axios.delete("/api/v1/auth/logout");
      await removeUser();
      alertMessages("success", `${response.data}`);
    } catch (error) {
      console.log(error.response.data);
    }
  };

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
      <div className="btn-container">
        <div className="notification-container">
          {notification ? <IoIosNotificationsOff /> : <IoIosNotifications />}
        </div>
        <div className="logout-container">
          <p>{user.name.charAt(0).toUpperCase()}</p>
          <div className="icon-container" onClick={() => logout()}>
            <ImExit className="exit-icon" />
          </div>
        </div>
      </div>
      <div>
        {!isSidebar ? (
          <FaBars className="open-icon" onClick={() => openSidebar()} />
        ) : (
          <FaWindowClose
            className="close-icon"
            onClick={() => closeSidebar()}
          />
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

  div {
    padding: 1.5rem;
  }

  .logout-container,
  .icon-container {
    padding: 0;
  }

  .btn-container {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  .logout-container {
    cursor: pointer;
    display: none;
    justify-content: center;
    align-items: center;
    background: dodgerblue;
    user-select: none;
    position: relative;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    transition: var(--transition);
    p {
      font-size: 1.5rem;
      color: whitesmoke;
    }

    .icon-container {
      position: absolute;
      z-index: -1;
    }

    &:hover {
      background: transparent;
    }

    &:hover p {
      display: none;
    }

    &:hover .icon-container {
      z-index: 1;
    }
  }

  svg {
    transform: translate(3px, 2.5px);
    font-size: 1.5rem;
    transition: var(--transition);
    color: var(--primary-clr-2);
  }

  svg:hover {
    color: orangered;
  }

  &:hover {
    box-shadow: 2px 2px 10px #222;
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

  .open-icon,
  .close-icon {
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

    .logout-container {
      display: flex;
      .exit-icon {
        display: block;
      }
    }

    .open-icon,
    .close-icon {
      display: none;
    }
  }
`;

export default Navbar;
