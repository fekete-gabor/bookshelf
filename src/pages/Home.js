import { useAppContext } from "../context/app_context";
import styled from "styled-components";

const Home = () => {
  const { favouriteBook } = useAppContext();

  return (
    <Wrapper>
      {favouriteBook?.singleBook ? (
        <div className="book">
          <h2>{`id: ${favouriteBook.singleBook.id}`}</h2>
          <h2>{`title: ${favouriteBook.singleBook.title}`}</h2>
          <div className="">
            <h2>authors:</h2>
            {favouriteBook.singleBook.authors.map((author, i) => {
              return (
                <h2 key={i} className="author">
                  {author}
                </h2>
              );
            })}
          </div>
        </div>
      ) : (
        <h2>looks like there is nothing here, try to add some books</h2>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 100vh;
  .book {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }

  .author {
    color: dodgerblue;
  }
`;

export default Home;
