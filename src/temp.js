const Wrapper = styled.div`
  width: 100%;
  background: whitesmoke;
  padding-top: 50px;

  .book-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    div {
      margin-bottom: 0.5rem;
      padding: 1rem;
      border-bottom: dotted 1px goldenrod;
    }
    .btn-container {
      border: none;
      display: flex;
      flex-direction: column;
    }
  }

  img {
    max-width: 350px;
    max-height: 350px;
    object-fit: scale-down;
    border-radius: 15px;
  }

  .authors {
    color: dodgerblue;
  }

  h4 {
    color: black;
  }

  @media screen and (min-width: 792px) {
    width: 700px;
    margin: 0 auto;
    .book-container {
      padding: 0 5rem;
      margin: 0 auto;
    }
  }
`;
