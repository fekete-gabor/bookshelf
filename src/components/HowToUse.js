import array from "../utils/howToUseSteps";
import useMediaQuery from "../utils/mediaQuery";
import styled from "styled-components";

const HowToUse = () => {
  const mediaQuery = useMediaQuery("(min-width: 1000px)");

  if (!mediaQuery) {
    return (
      <Wrapper>
        <div className="">
          <h2>how to use</h2>
        </div>
        <div className="">
          {array.map((item) => {
            const { id, img, text } = item;

            return (
              <div className="q sm-border" key={id}>
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
      <div className="">
        <h2>how to use</h2>
      </div>
      <div className="">
        {array.map((item) => {
          const { id, img, text } = item;
          if (id % 2 === 0) {
            return (
              <div className="q even" key={id}>
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
              <div className="q odd" key={id}>
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
  .border {
    padding: 1rem 0;
    margin: 0 auto;
    width: 75vw;
    box-shadow: -3px 3px 3px darkgoldenrod;
  }
  .q {
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

  .sm-border {
    text-align: center;
    box-shadow: 3px 3px 3px dodgerblue;
    margin-bottom: 2rem;
  }

  @media screen and (min-width: 1000px) {
    .q,
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
