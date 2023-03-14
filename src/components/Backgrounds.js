import { useEffect } from "react";
import { useAppContext } from "../context/app_context";
import bgArray from "../utils/bgs";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";

const Backgrounds = () => {
  const { backgroundsIsVisible, showBackgrounds, changeBackgroundIndex } =
    useAppContext();
  const container = document.querySelector(".background-container");

  useEffect(() => {
    gsap.set(container, { x: "+100%" });
  }, [container]);

  useEffect(() => {
    if (showBackgrounds) {
      gsap.to(container, { x: "0%" });
    } else {
      gsap.to(container, { x: "+100%" });
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
    <Wrapper className="background-container">
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 997;
  display: grid;
  background: plum;
  gap: 2px;
  padding: 2px;
  overflow-y: scroll;

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: black;
  }

  .img-container {
    width: 100%;
    height: 270px;
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
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

export default Backgrounds;
