import React, { useContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/app_reducer";
import { alertMessages } from "../utils/alertMessages";
import { formatSearchValues } from "../utils/formatSearchValues";
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
  CLOSE_MODAL,
  SHOW_NOTIFICATIONS,
  HIDE_NOTIFICATIONS,
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

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  isSidebar: false,
  isModal: { notification: true, status: false, tempTitle: "" },
  user: {
    name: "",
    email: "",
  },
  allBooks: [],
  singleBook: {
    id: "",
    title: "",
    subtitle: "",
    authors: "",
    averageRating: "",
    ratingsCount: "",
    categories: "",
    description: "",
    language: "",
    pageCount: "",
    publishedDate: "",
    publisher: "",
    image: "",
  },
  bookPayload: null,
  allFavouriteBooks: [],
  singleFavouriteBook: [],
  counter: 0,
  categoryName: "places",
  isFormVisible: false,
  inputList: [],
  isEditing: { status: false, id: null },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchAuthor, setSearchAuthor] = useState("mark+lawrence");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxResults, setMaxResults] = useState(10);

  let path;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const key = process.env.REACT_APP_API_KEY;

  const showCurrentUser = async () => {
    dispatch({ type: FETCH_CURRENT_USER_PENDING });
    try {
      const response = await axios("/api/v1/auth/showCurrentUser");
      const payload = await response.data.user;
      dispatch({ type: FETCH_CURRENT_USER_SUCCESSFUL, payload });
    } catch (error) {
      dispatch({ type: FETCH_CURRENT_USER_REJECTED, payload: error });
    }
  };

  const verifyEmail = async (payload) => {
    dispatch({ type: VERIFY_EMAIL_PENDING });
    try {
      await axios.post(
        "http://localhost:5000/api/v1/auth/verifyEmail",
        payload
      );
      dispatch({ type: VERIFY_EMAIL_SUCCESSFUL });
      alertMessages("success", "email successfully verified!");
    } catch (error) {
      dispatch({ type: VERIFY_EMAIL_REJECTED, payload: error });
      alertMessages("error", "something went wrong, please try again!");
    }
  };

  // **************
  // GLOBAL FUNCTIONS
  // **************

  const saveUser = (user) => {
    dispatch({ type: SAVE_USER, payload: user });
  };

  const removeUser = () => {
    dispatch({ type: REMOVE_USER });
  };

  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };

  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };

  const openModal = (title) => {
    dispatch({ type: OPEN_MODAL, payload: title });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const showModalNotification = () => {
    dispatch({ type: SHOW_NOTIFICATIONS });
  };

  const hideModalNotification = () => {
    dispatch({ type: HIDE_NOTIFICATIONS });
  };

  // **************
  // FETCH BOOKS FROM GOOGLE
  // **************

  const constructUrl = () => {
    if (searchAuthor && !searchTerm) {
      path = `${baseUrl}?q=inauthor:${formatSearchValues(
        searchAuthor
      )}&maxResults=${maxResults}&key=${key}`;
    }

    if (!searchAuthor && searchTerm) {
      path = `${baseUrl}?q=intitle:${formatSearchValues(
        searchTerm
      )}&maxResults=${maxResults}&key=${key}`;
    }

    if (searchAuthor && searchTerm) {
      path = `${baseUrl}?q=intitle:${formatSearchValues(
        searchTerm
      )}+inauthor:${formatSearchValues(
        searchAuthor
      )}&maxResults=${maxResults}&key=${key}`;
    }

    return path;
  };

  const fetchAllBooksFromGoogle = async () => {
    dispatch({ type: FETCH_ALL_BOOKS_FROM_GOOGLE_PENDING });
    try {
      const url = await constructUrl();
      const response = await axios(url);
      const payload = await response.data.items;
      dispatch({ type: FETCH_ALL_BOOKS_FROM_GOOGLE_SUCCESSFUL, payload });
    } catch (error) {
      dispatch({ type: FETCH_ALL_BOOKS_FROM_GOOGLE_REJECTED, payload: error });
    }
  };

  const fetchSingleBookFromGoogle = async (id) => {
    dispatch({ type: FETCH_SINGLE_BOOK_FROM_GOOGLE_PENDING });
    try {
      const response = await axios(`${baseUrl}/${id}?key=${key}`);
      const data = await response.data.volumeInfo;
      const payload = { id, data };
      dispatch({ type: FETCH_SINGLE_BOOK_FROM_GOOGLE_SUCCESSFUL, payload });
    } catch (error) {
      dispatch({
        type: FETCH_SINGLE_BOOK_FROM_GOOGLE_REJECTED,
        payload: error,
      });
    }
  };

  // **************
  // SEND BOOKS TO MONGODB
  // **************

  const createBookPayload = () => {
    dispatch({ type: CREATE_BOOK_PAYLOAD });
  };

  const saveBookPayload = async () => {
    try {
      if (state.bookPayload) {
        const { bookPayload } = state;
        const url = "/api/v1/bookshelf";
        await axios.post(url, bookPayload);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  // **************
  // FETCH BOOKS FROM MONGODB
  // **************

  const fetchAllFavouriteBooks = async () => {
    dispatch({ type: FETCH_ALL_BOOKS_FROM_MONGODB_PENDING });
    try {
      const response = await axios("/api/v1/bookshelf");
      const { books: payload } = response.data;
      dispatch({
        type: FETCH_ALL_BOOKS_FROM_MONGODB_SUCCESSFUL,
        payload,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALL_BOOKS_FROM_MONGODB_REJECTED,
        payload: error,
      });
    }
  };

  const fetchSingleBookFromMongoDB = async (id) => {
    dispatch({ type: FETCH_SINGLE_BOOK_FROM_MONGODB_PENDING });
    try {
      const response = await axios(`/api/v1/bookshelf/${id}`);
      const { singleBook: payload } = response.data;
      dispatch({ type: FETCH_SINGLE_BOOK_FROM_MONGODB_SUCCESSFUL, payload });
    } catch (error) {
      dispatch({
        type: FETCH_SINGLE_BOOK_FROM_MONGODB_REJECTED,
        payload: error,
      });
    }
  };

  const removeFromFavourite = async (id) => {
    try {
      await axios.delete(`/api/v1/bookshelf/${id}`);
    } catch (error) {
      dispatch({ type: FETCH_ALL_BOOKS_FROM_MONGODB_REJECTED, payload: error });
    }
  };

  // **************
  // CHANGE FAVOURITE BOOK'S ICONS
  // **************

  const findAllFavouritedBooks = () => {
    dispatch({ type: CHANGE_FAVOURITE_ICON_ON_LOAD });
  };

  const changeToAddButton = (id) => {
    dispatch({ type: ADD_FAVOURITE_ICON, payload: id });
  };

  const changeToRemoveButton = (id) => {
    dispatch({ type: REMOVE_FAVOURITE_ICON, payload: id });
  };

  // **************
  // EDIT FAVOURITE BOOK FUNCTIONS
  // **************

  const changeCategory = (title) => {
    dispatch({ type: CHANGE_CATEGORY, payload: title });
  };

  const showForm = () => {
    dispatch({ type: SHOW_FORM });
  };

  const hideForm = () => {
    dispatch({ type: HIDE_FORM });
  };

  const increaseCounter = () => {
    dispatch({ type: INCREASE_BTN_COUNTER });
  };

  const updateInputList = (input) => {
    dispatch({ type: UPDATE_INPUT_LIST, payload: input });
  };

  const deleteInput = (id) => {
    dispatch({ type: DELETE_INPUT, payload: id });
  };

  const editInput = (id) => {
    dispatch({ type: EDIT_INPUT, payload: id });
  };

  const stopEditing = () => {
    dispatch({ type: STOP_EDITING });
  };

  useEffect(() => {
    showCurrentUser();
  }, []);

  useEffect(() => {
    if (state.user.email.length > 0) {
      fetchAllBooksFromGoogle();
      fetchAllFavouriteBooks();
    }
    // eslint-disable-next-line
  }, [state.user]);

  useEffect(() => {
    findAllFavouritedBooks();
    // eslint-disable-next-line
  }, [state.allBooks, state.allFavouriteBooks]);

  useEffect(() => {
    saveBookPayload();
    // eslint-disable-next-line
  }, [state.bookPayload]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        verifyEmail,
        saveUser,
        removeUser,
        openSidebar,
        closeSidebar,
        openModal,
        closeModal,
        showModalNotification,
        hideModalNotification,
        maxResults,
        searchTerm,
        searchAuthor,
        setMaxResults,
        setSearchAuthor,
        setSearchTerm,
        constructUrl,
        fetchAllBooksFromGoogle,
        fetchSingleBookFromGoogle,
        createBookPayload,
        removeFromFavourite,
        fetchAllFavouriteBooks,
        fetchSingleBookFromMongoDB,
        changeToAddButton,
        changeToRemoveButton,
        changeCategory,
        showForm,
        hideForm,
        increaseCounter,
        updateInputList,
        deleteInput,
        editInput,
        stopEditing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
