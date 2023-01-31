import { FaWindowClose } from "../utils/icons";
import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Modal = ({ text }) => {
  const { isModal, hideForm, changeFieldTitle, closeModal } = useAppContext();
  const { status, tempTitle } = isModal;

  const handleChange = async () => {
    try {
      await changeFieldTitle(tempTitle);
      await hideForm();
      await closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  if (status) {
    return (
      <Wrapper>
        <div className="container">
          <div className="icon-container" onClick={() => closeModal()}>
            <FaWindowClose />
          </div>
          <article>
            <p>{text}</p>
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
    width: 45%;
    height: 350px;
    padding: 1rem 4rem;
    border-radius: 15px;
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
`;

export default Modal;
