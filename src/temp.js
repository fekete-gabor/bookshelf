if (action.type === "filter") {
  const { searchAuthor, searchTerm } = action.payload;

  const formatAuthor = searchAuthor.replaceAll("+", " ");
  const formatTerm = searchTerm.replaceAll("+", " ");

  let tempArray = [...state.allFavouriteBooks];

  if (formatAuthor.length === 0 && formatTerm.length === 0) {
    return { ...state, filteredFavouriteBooks: state.allFavouriteBooks };
  }

  if (formatAuthor.length > 0 && formatTerm.length === 0) {
    tempArray = tempArray.filter((books) => {
      const find = books.authors.find((author) =>
        author.toLowerCase().includes(formatAuthor)
      );
      if (find) return books;
    });
  }

  if (formatAuthor.length === 0 && formatTerm.length > 0) {
    tempArray = tempArray.filter((books) =>
      books.title.toLowerCase().includes(searchTerm)
    );
  }

  if (formatAuthor.length > 0 && formatTerm.length > 0) {
    tempArray = tempArray
      .filter((books) => {
        const find = books.authors.find((author) =>
          author.toLowerCase().includes(formatAuthor)
        );
        if (find) return books;
      })
      .filter((books) => books.title.toLowerCase().includes(searchTerm));
  }

  return { ...state, filteredFavouriteBooks: tempArray };
}
