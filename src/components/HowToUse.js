import array from "../utils/howToUseSteps";
import useMediaQuery from "../utils/mediaQuery";
import styled from "styled-components";

const HowToUse = () => {
  const mediaQuery = useMediaQuery("(min-width: 1000px)");

  if (!mediaQuery) {
    return (
      <Wrapper>
        <div>
          <h2>how to use</h2>
        </div>
        <div>
          {array.map((item) => {
            const { id, img, text } = item;

            return (
              <div className="container sm-border" key={id}>
                <article>
                  <h3>step {id}</h3>
                  <p>{text}</p>
                </article>
                <header>
                  <img src={img} alt={text} />
                </header>
              </div>
            );
          })}
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="title">
        <h2>how to use</h2>
      </div>
      <div>
        {array.map((item) => {
          const { id, img, text } = item;
          if (id % 2 === 0) {
            return (
              <div className="container even" key={id}>
                <header>
                  <img src={img} alt={text} />
                </header>
                <article>
                  <h3>step {id}</h3>
                  <p>{text}</p>
                </article>
              </div>
            );
          } else {
            return (
              <div className="container odd" key={id}>
                <article>
                  <h3>step {id}</h3>
                  <p>{text}</p>
                </article>
                <header>
                  <img src={img} alt={text} />
                </header>
              </div>
            );
          }
        })}
      </div>
      <div className="border"></div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4rem 0 7rem 0;
    text-align: center;
    text-decoration: underline hotpink;
  }

  .container {
    width: 95vw;
    display: grid;
    margin: 0rem auto;
    padding: 1rem;
    header {
      width: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    article {
      padding: 1rem 3rem;
    }
  }

  .border {
    padding: 1rem 0;
    margin: 0 auto;
    width: 75vw;
    box-shadow: -3px 3px 3px darkgoldenrod;
  }

  .sm-border {
    text-align: center;
    box-shadow: 3px 3px 3px dodgerblue;
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 1000px) {
    .container,
    .border {
      width: 100%;
      max-width: 75vw;
    }
  }

  .odd {
    grid-template-columns: 35% 65%;
    text-align: right;
    box-shadow: 3px 3px 3px dodgerblue;
  }

  .even {
    grid-template-columns: 65% 35%;
    box-shadow: -3px 3px 3px darkgoldenrod;
  }
`;

export default HowToUse;
