import {
  SAVE_USER,
  REMOVE_USER,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  FETCH_PENDING,
  FETCH_SUCCESSFUL,
  FETCH_REJECTED,
  FETCH_SINGLE_BOOK_PENDING,
  FETCH_SINGLE_BOOK_SUCCESSFUL,
  FETCH_SINGLE_BOOK_REJECTED,
  CREATE_FAVOURITE_BOOK,
} from "../actions";

const app_reducer = (state, action) => {
  if (action.type === SAVE_USER) {
    return { ...state, user: action.payload };
  }

  if (action.type === REMOVE_USER) {
    return { ...state, user: { name: "" } };
  }

  if (action.type === OPEN_SIDEBAR) {
    return { ...state, isSidebar: true };
  }

  if (action.type === CLOSE_SIDEBAR) {
    return { ...state, isSidebar: false };
  }

  if (action.type === FETCH_PENDING) {
    return { ...state, isLoading: true, isError: false };
  }

  if (action.type === FETCH_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      books: action.payload,
    };
  }

  if (action.type === FETCH_REJECTED) {
    console.log(action.payload.message);
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === FETCH_SINGLE_BOOK_PENDING) {
    return { ...state, isLoading: true, isError: false };
  }

  if (action.type === FETCH_SINGLE_BOOK_SUCCESSFUL) {
    const { id, data } = action.payload;

    const {
      title,
      subtitle,
      authors,
      averageRating,
      ratingsCount,
      categories,
      description,
      language,
      pageCount,
      publishedDate,
      publisher,
    } = data;

    const image = data?.imageLinks?.thumbnail;
    return {
      ...state,
      isLoading: false,
      isError: false,
      singleBook: {
        id,
        title,
        subtitle,
        authors,
        averageRating,
        ratingsCount,
        categories,
        description,
        language,
        pageCount,
        publishedDate,
        publisher,
        image,
      },
    };
  }

  if (action.type === FETCH_SINGLE_BOOK_REJECTED) {
    console.log(action.payload.message);
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === CREATE_FAVOURITE_BOOK) {
    const { user, singleBook } = state;
    return { ...state, favouriteBook: { user, singleBook } };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default app_reducer;
