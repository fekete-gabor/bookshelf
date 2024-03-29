import {
  FaWindowClose,
  IoIosNotificationsOff,
  IoIosNotifications,
} from "../utils/icons";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Modal = () => {
  const { isModal, changeUserNotifications, runModalFunctions, closeModal } =
    useAppContext();

  const { notification, open, alertMessage } = isModal;

  const handleChange = async () => {
    try {
      await runModalFunctions();
      await closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  if (open) {
    return (
      <Wrapper>
        <div className="container">
          <div className="icon-container">
            {notification ? (
              <IoIosNotificationsOff
                onClick={() => changeUserNotifications()}
              />
            ) : (
              <IoIosNotifications onClick={() => changeUserNotifications()} />
            )}
            <FaWindowClose onClick={() => closeModal()} />
          </div>
          <article>
            <p>{alertMessage}</p>
          </article>
          <div className="btn-container">
            <button className="btn" onClick={() => handleChange()}>
              ok
            </button>
            <button className="btn" onClick={() => closeModal()}>
              cancel
            </button>
          </div>
        </div>
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));

  .container {
    display: grid;
    text-align: center;
    grid-template-rows: 1fr auto;
    position: relative;
    background: whitesmoke;
    width: 95%;
    height: 350px;
    padding: 1rem;
    border-radius: 15px;

    p {
      font-size: 1.15rem;
    }
  }

  article {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon-container {
    position: absolute;
    top: 15px;
    right: 20px;
    display: flex;
    gap: 0.5rem;

    svg {
      cursor: pointer;
      font-size: 1.5rem;
      display: block;
      transition: var(--transition);
      color: orangered;
      &:hover {
        color: red;
      }
    }
  }

  @media screen and (min-width: 792px) {
    .container {
      width: 55%;
      padding: 1rem 4rem;
      p {
        font-size: 1.25rem;
      }
    }
  }
`;

export default Modal;
