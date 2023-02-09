import {
  FETCH_CURRENT_USER_PENDING,
  FETCH_CURRENT_USER_SUCCESSFUL,
  FETCH_CURRENT_USER_REJECTED,
  VERIFY_EMAIL_PENDING,
  VERIFY_EMAIL_SUCCESSFUL,
  VERIFY_EMAIL_REJECTED,
  SAVE_USER,
  REMOVE_USER,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  OPEN_MODAL,
  RUN_MODAL_FUNCTIONS,
  CLOSE_MODAL,
  CHANGE_USER_NOTIFICATION,
  FETCH_ALL_BOOKS_FROM_GOOGLE_PENDING,
  FETCH_ALL_BOOKS_FROM_GOOGLE_SUCCESSFUL,
  FETCH_ALL_BOOKS_FROM_GOOGLE_REJECTED,
  FETCH_SINGLE_BOOK_FROM_GOOGLE_PENDING,
  FETCH_SINGLE_BOOK_FROM_GOOGLE_SUCCESSFUL,
  FETCH_SINGLE_BOOK_FROM_GOOGLE_REJECTED,
  CREATE_BOOK_PAYLOAD,
  FETCH_ALL_BOOKS_FROM_MONGODB_PENDING,
  FETCH_ALL_BOOKS_FROM_MONGODB_SUCCESSFUL,
  FETCH_ALL_BOOKS_FROM_MONGODB_REJECTED,
  FETCH_SINGLE_BOOK_FROM_MONGODB_PENDING,
  FETCH_SINGLE_BOOK_FROM_MONGODB_SUCCESSFUL,
  FETCH_SINGLE_BOOK_FROM_MONGODB_REJECTED,
  CHANGE_CATEGORY,
  SHOW_FORM,
  HIDE_FORM,
  INCREASE_BTN_COUNTER,
  UPDATE_INPUT_LIST,
  DELETE_INPUT,
  EDIT_INPUT,
  STOP_EDITING,
  CHANGE_FAVOURITE_ICON_ON_LOAD,
  ADD_FAVOURITE_ICON,
  REMOVE_FAVOURITE_ICON,
} from "../actions";

const app_reducer = (state, action) => {
  if (action.type === FETCH_CURRENT_USER_PENDING) {
    return { ...state, isLoading: true, isError: false };
  }

  if (action.type === FETCH_CURRENT_USER_SUCCESSFUL) {
    const { name, notification, email } = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      user: { name, email },
      isModal: { ...state.isModal, notification },
    };
  }

  if (action.type === FETCH_CURRENT_USER_REJECTED) {
    console.log(action.payload.message);
    return { ...state, isLoading: true, isError: true };
  }

  if (action.type === VERIFY_EMAIL_PENDING) {
    return { ...state, isLoading: true, isError: false };
  }

  if (action.type === VERIFY_EMAIL_SUCCESSFUL) {
    return { ...state, isLoading: false, isError: false };
  }

  if (action.type === VERIFY_EMAIL_REJECTED) {
    console.log(action.payload.message);
    return { ...state, isLoading: true, isError: true };
  }

  if (action.type === SAVE_USER) {
    const { name, notification, email } = action.payload;
    return {
      ...state,
      user: { name, email },
      isModal: { ...state.isModal, notification },
    };
  }

  if (action.type === REMOVE_USER) {
    return { ...state, user: { name: "", email: "" } };
  }

  if (action.type === OPEN_SIDEBAR) {
    return { ...state, isSidebar: true };
  }

  if (action.type === CLOSE_SIDEBAR) {
    return { ...state, isSidebar: false };
  }

  if (action.type === OPEN_MODAL) {
    const { message, actionType } = action.payload;
    return {
      ...state,
      isModal: {
        ...state.isModal,
        open: true,
        actionName: actionType,
        alertMessage: message,
      },
    };
  }

  if (action.type === RUN_MODAL_FUNCTIONS) {
    const { isModal } = state;

    if (isModal.actionName === "changeCategory") {
      return {
        ...state,
        isModal: {
          ...state.isModal,
          allActions: {
            changeCategory: true,
            removeFromFavourite: false,
            delete: false,
          },
        },
      };
    }

    if (isModal.actionName === "removeFromFavourite") {
      return {
        ...state,
        isModal: {
          ...state.isModal,
          allActions: {
            changeCategory: false,
            removeFromFavourite: true,
            delete: false,
          },
        },
      };
    }

    if (isModal.actionName === "delete") {
      return {
        ...state,
        isModal: {
          ...state.isModal,
          allActions: {
            changeCategory: false,
            removeFromFavourite: false,
            delete: true,
          },
        },
      };
    }
    return { ...state };
  }

  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      isModal: {
        ...state.isModal,
        open: false,
        alertMessage: "",
        allActions: {
          changeCategory: false,
          removeFromFavourite: false,
          delete: false,
        },
      },
    };
  }

  if (action.type === CHANGE_USER_NOTIFICATION) {
    return {
      ...state,
      isModal: { ...state.isModal, notification: action.payload },
    };
  }

  // **************
  // FETCH BOOKS FROM GOOGLE
  // **************

  if (action.type === FETCH_ALL_BOOKS_FROM_GOOGLE_PENDING) {
    return { ...state, isLoading: true, isError: false };
  }

  if (action.type === FETCH_ALL_BOOKS_FROM_GOOGLE_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      allBooks: action.payload,
    };
  }

  if (action.type === FETCH_ALL_BOOKS_FROM_GOOGLE_REJECTED) {
    console.log(action.payload.message);
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === FETCH_SINGLE_BOOK_FROM_GOOGLE_PENDING) {
    return { ...state, isLoading: true, isError: false };
  }

  if (action.type === FETCH_SINGLE_BOOK_FROM_GOOGLE_SUCCESSFUL) {
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

    const favouriteIDs =
      state.allFavouriteBooks && state.allFavouriteBooks.map((book) => book.id);
    const book = favouriteIDs && favouriteIDs.find((bookID) => bookID === id);
    const favourite = book ? true : false;

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
        favourite,
      },
    };
  }

  if (action.type === FETCH_SINGLE_BOOK_FROM_GOOGLE_REJECTED) {
    console.log(action.payload.message);
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === CREATE_BOOK_PAYLOAD) {
    const { user, singleBook } = state;
    return { ...state, bookPayload: { user, singleBook } };
  }

  // **************
  // FETCH BOOKS FROM MONGODB
  // **************

  if (action.type === FETCH_ALL_BOOKS_FROM_MONGODB_PENDING) {
    return { ...state, isLoading: true, isError: false };
  }

  if (action.type === FETCH_ALL_BOOKS_FROM_MONGODB_SUCCESSFUL) {
    const { books, numberOfPages } = action.payload;
    return {
      ...state,
      isLoading: false,
      isError: false,
      allFavouriteBooks: books,
      numberOfPages,
    };
  }

  if (action.type === FETCH_ALL_BOOKS_FROM_MONGODB_REJECTED) {
    console.log(action.payload.message);
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === FETCH_SINGLE_BOOK_FROM_MONGODB_PENDING) {
    return { ...state, isLoading: true, isError: false };
  }

  if (action.type === FETCH_SINGLE_BOOK_FROM_MONGODB_SUCCESSFUL) {
    return {
      ...state,
      isLoading: false,
      isError: false,
      singleFavouriteBook: action.payload,
    };
  }

  if (action.type === FETCH_SINGLE_BOOK_FROM_MONGODB_REJECTED) {
    console.log(action.payload.message);
    return { ...state, isLoading: false, isError: true };
  }

  if (action.type === CHANGE_FAVOURITE_ICON_ON_LOAD) {
    const favouriteIDs = state.allFavouriteBooks && [
      ...new Set(state.allFavouriteBooks.map((book) => book.id)),
    ];

    // eslint-disable-next-line
    state.allBooks.map((book) => {
      const findFavourite =
        favouriteIDs && favouriteIDs.find((id) => id === book.id);

      book.volumeInfo = {
        ...book.volumeInfo,
        favourite: findFavourite ? true : false,
      };
    });

    return { ...state };
  }

  if (action.type === ADD_FAVOURITE_ICON) {
    const bookID = action.payload;

    let book = state.allBooks.find((book) => book.id === bookID);
    book.volumeInfo.favourite = true;
    return { ...state, singleBook: { ...state.singleBook, favourite: true } };
  }

  if (action.type === REMOVE_FAVOURITE_ICON) {
    const bookID = action.payload;

    let book = state.allBooks.find((book) => book.id === bookID);
    book.volumeInfo.favourite = false;
    return { ...state, singleBook: { ...state.singleBook, favourite: false } };
  }

  // **************
  // EDIT FAVOURITE BOOK FUNCTIONS
  // **************

  if (action.type === CHANGE_CATEGORY) {
    return { ...state, categoryName: action.payload };
  }

  if (action.type === SHOW_FORM) {
    return { ...state, isFormVisible: true };
  }

  if (action.type === HIDE_FORM) {
    return { ...state, isFormVisible: false };
  }

  if (action.type === INCREASE_BTN_COUNTER) {
    const { isEditing } = state;

    // if editing, dont increment counter
    if (isEditing.status) return { ...state };

    return { ...state, counter: state.counter + 1 };
  }

  if (action.type === UPDATE_INPUT_LIST) {
    const { counter, inputList, isEditing } = state;
    const { category, inputs } = action.payload;
    const { id: editID } = isEditing;

    let currentInput = inputs[0];
    currentInput.id = counter;

    // if inputList was empty (e.g. after page load), create first object
    if (inputList.length === 0) {
      return { ...state, inputList: [{ category, inputs }] };
    }

    let findInput = inputList.find((input) => input.category === category);

    // if category wasn't found create first instance
    if (!findInput) {
      return { ...state, inputList: [...inputList, { category, inputs }] };
    }

    // if category was found, but currently being edited
    if (isEditing.status) {
      currentInput.id = editID;
      const { inputs } = findInput;

      // find object's being edited & it's values
      const editedInputs = inputs.map((input) => {
        if (input.id === editID) {
          const { name, desc, id } = currentInput;
          const obj = { name, desc, id };
          return obj;
        } else {
          return input;
        }
      });

      // find category that was edited
      const editedList = inputList.map((input) => {
        if (input.category === category) {
          const obj = { ...input, inputs: editedInputs };
          return obj;
        } else {
          return input;
        }
      });

      return {
        ...state,
        isEditing: { status: false, id: null },
        inputList: editedList,
      };
    }

    // if category was found and currently not being edited
    const newList = inputList.map((input) => {
      if (input.category === category) {
        const obj = {
          ...input,
          inputs: [...input.inputs, currentInput],
        };
        return obj;
      } else {
        return input;
      }
    });

    return {
      ...state,
      inputList: newList,
      isEditing: { status: false, id: null },
    };
  }

  if (action.type === DELETE_INPUT) {
    const id = action.payload;
    const { inputList, fieldTitle } = state;

    const newList = inputList.map((input) => {
      if (input.fieldName === fieldTitle) {
        const obj = {
          ...input,
          inputs: input.inputs.filter((input) => input.id !== id),
        };
        return obj;
      } else {
        return input;
      }
    });

    return { ...state, inputList: newList };
  }

  if (action.type === EDIT_INPUT) {
    const id = action.payload;
    return { ...state, isEditing: { status: true, id } };
  }

  if (action.type === STOP_EDITING) {
    return { ...state, isEditing: { status: false, id: null } };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default app_reducer;
