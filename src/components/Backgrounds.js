import { useEffect } from "react";
import { useAppContext } from "../context/app_context";
import { FaWindowClose } from "../utils/icons";
import bgArray from "../utils/bgs";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";

const Backgrounds = () => {
  const { backgroundsIsVisible, showBackgrounds, changeBackgroundIndex } =
    useAppContext();
  const container = document.querySelector(".main-bg-container");

  // additional if statements to prevent console warning
  useEffect(() => {
    if (container) gsap.set(container, { x: "+100%" });
  }, [container]);

  useEffect(() => {
    if (container) {
      if (showBackgrounds) {
        gsap.to(container, { x: "0%" });
      } else {
        gsap.to(container, { x: "+100%" });
      }
    }
  }, [container, showBackgrounds]);

  const handleChange = async (i) => {
    try {
      await backgroundsIsVisible();
      await changeBackgroundIndex(i);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper className="main-bg-container">
      <div className="icon-container" onClick={() => backgroundsIsVisible()}>
        <FaWindowClose />
      </div>
      <div className="background-container">
        {bgArray.map((bg, i) => {
          return (
            <div
              className="img-container"
              key={i}
              onClick={() => handleChange(i)}
            >
              <img src={bg} alt="main" />
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: plum;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .icon-container {
    cursor: pointer;
    width: fit-content;
    height: fit-content;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem;
    border-radius: 50%;
    top: 15px;
    right: 15px;
    z-index: 999;
    background: whitesmoke;
    transition: var(--transition);
    svg {
      color: red;
      font-size: 2rem;
    }
    &:hover {
      background: #222;
    }
    &:hover svg {
      color: #fc3;
    }
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: black;
  }

  .background-container {
    width: 100%;
    height: 100%;
    display: grid;
    gap: 2px;
    padding: 2px;
  }

  .img-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 15px;
    img {
      transition: var(--transition);
      cursor: pointer;
      border-radius: 15px;
      width: 100%;
      height: 100%;
      object-fit: cover;
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  @media screen and (min-width: 425px) {
    .background-container {
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    }
  }
`;

export default Backgrounds;
