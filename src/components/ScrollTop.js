import { BsFillArrowUpCircleFill } from "../utils/icons";
import styled from "styled-components";

const ScrollTop = () => {
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Wrapper>
      <BsFillArrowUpCircleFill onClick={() => scrollTop()} />
    </Wrapper>
  );
};

const Wrapper = styled.a`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: orange;
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 999;
  transition: all 0.3s;
  animation: bounce 3s ease-in-out infinite;

  @keyframes bounce {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  &:hover {
    background-color: hotpink;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
  }
`;

export default ScrollTop;
