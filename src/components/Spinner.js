import { useEffect } from "react";
import styled from "styled-components";
import { gsap } from "gsap/dist/gsap";

const Spinner = () => {
  useEffect(() => {
    gsap.set(".dot", { autoAlpha: 0 });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    tl.to(".dot", { autoAlpha: 1, stagger: { each: 0.25 } }).to(".dot", {
      autoAlpha: 0,
      stagger: { each: 0.25 },
    });
  }, []);

  return (
    <Wrapper>
      <div className="dot one"></div>
      <div className="dot two"></div>
      <div className="dot three"></div>
      <div className="dot four"></div>
      <div className="dot five"></div>
      <div className="dot six"></div>
      <div className="dot seven"></div>
      <div className="dot eight"></div>
      <div className="dot nine"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  background: whitesmoke;
  padding: 2rem;
  border-radius: 15px;

  .dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: blue;
  }

  .one {
    background: dodgerblue;
  }

  .two {
    background: hotpink;
  }

  .three {
    background: darkred;
  }

  .four {
    background: violet;
  }

  .five {
    background: tomato;
  }

  .six {
    background: rebeccapurple;
  }

  .seven {
    background: orangered;
  }

  .eight {
    background: darkorange;
  }

  .nine {
    background: magenta;
  }
`;

export default Spinner;
