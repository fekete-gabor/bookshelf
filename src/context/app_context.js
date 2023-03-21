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
  FETCH_ALL_CATEGORY_BTNS,
  FETCH_ALL_NOTES,
  DELETE_CATEGORY_BTN,
  DELETE_NOTE,
  RATE_BOOK,
  CHANGE_CATEGORY,
  SHOW_FORM,
  HIDE_FORM,
  EDIT_INPUT,
  STOP_EDITING,
  FETCH_ALL_IDS_FROM_MONGODB_PENDING,
  FETCH_ALL_IDS_FROM_MONGODB_SUCCESSFUL,
  FETCH_ALL_IDS_FROM_MONGODB_REJECTED,
  CHANGE_FAVOURITE_ICON_ON_LOAD,
  ADD_FAVOURITE_ICON,
  REMOVE_FAVOURITE_ICON,
} from "../actions";

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  isSidebar: false,
  isModal: {
    open: false,
    alertMessage: "",
    actionName: "",
    allActions: {
      changeCategory: false,
      deleteCategory: false,
      removeFromFavourite: false,
      delete: false,
    },
    notification: true,
  },
  user: {
    name: "",
    email: "",
  },
  bgIndex: null,
  showBackgrounds: false,
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
  allFavouriteBookIDs: [],
  numberOfPages: null,
  singleFavouriteBook: [],
  favouriteBookCategories: [],
  favouriteBookEdits: [],
  categoryName: "places",
  isFormVisible: false,
  isEditing: { status: false, id: null },
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxResults, setMaxResults] = useState(10);
  const [page, setPage] = useState(1);

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

  const openModal = (payload) => {
    dispatch({ type: OPEN_MODAL, payload });
  };

  const runModalFunctions = () => {
    dispatch({ type: RUN_MODAL_FUNCTIONS });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const backgroundsIsVisible = () => {
    dispatch({ type: "11" });
  };

  const changeBackgroundIndex = async (index) => {
    try {
      const { user } = state;
      const url = `/api/v1/auth/changeBackgroundIndex`;
      const payload = { email: user.email, index };
      const response = await axios.patch(url, payload);
      const { backgroundIndex } = await response.data;
      dispatch({ type: "a", payload: backgroundIndex });
    } catch (error) {
      console.log(error);
    }
  };

  const changeUserNotifications = async () => {
    const { user, isModal } = state;
    const payload = { email: user.email, notification: isModal.notification };
    const url = "/api/v1/auth/changeUserNotifications";
    try {
      const response = await axios.patch(url, payload);
      const { message, notificationStatus } = await response.data;
      alertMessages("success", message);
      dispatch({ type: CHANGE_USER_NOTIFICATION, payload: notificationStatus });
    } catch (error) {
      console.log(error);
    }
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
      if (searchAuthor || searchTerm) {
        const url = await constructUrl();
        const response = await axios(url);
        const payload = await response.data.items;
        dispatch({ type: FETCH_ALL_BOOKS_FROM_GOOGLE_SUCCESSFUL, payload });
      }
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
      const response = await axios(
        `/api/v1/bookshelf?author=${searchAuthor}&title=${searchTerm}&maxResults=${maxResults}&page=${page}`
      );
      const payload = await response.data;
      dispatch({
        type: FETCH_ALL_BOOKS_FROM_MONGODB_SUCCESSFUL,
        payload,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ALL_BOOKS_FROM_MONGODB_REJECTED,
        payload: error,
      });
      alertMessages("error", error.response.data.msg);
    }
  };

  const fetchUniqueIDs = async () => {
    dispatch({ type: FETCH_ALL_IDS_FROM_MONGODB_PENDING });
    try {
      const response = await axios.get(`/api/v1/bookshelf/getUniqueIDs`);
      const { allUniqueIDs } = await response.data;
      dispatch({
        type: FETCH_ALL_IDS_FROM_MONGODB_SUCCESSFUL,
        payload: allUniqueIDs,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_ALL_IDS_FROM_MONGODB_REJECTED });
    }
  };

  const fetchSingleBookFromMongoDB = async (id) => {
    dispatch({ type: FETCH_SINGLE_BOOK_FROM_MONGODB_PENDING });
    try {
      const response = await axios(`/api/v1/bookshelf/${id}`);
      const payload = await response.data.singleBook;
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

  const findAllFavouriteBooks = () => {
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

  const getAllCategories = async (id) => {
    try {
      const response = await axios(`/api/v1/edit/getAllCategories/${id}`);
      const { categories } = await response.data;
      dispatch({ type: FETCH_ALL_CATEGORY_BTNS, payload: categories });
    } catch (error) {
      console.log(error);
    }
  };

  const getNotes = async (id, category) => {
    try {
      const response = await axios(
        `/api/v1/edit/getAllNotes/${id}?category=${category}`
      );
      const { inputs } = await response.data;
      dispatch({ type: FETCH_ALL_NOTES, payload: inputs });
    } catch (error) {
      console.log(error);
    }
  };

  const changeCategory = (title) => {
    dispatch({ type: CHANGE_CATEGORY, payload: title });
  };

  const deleteCategory = async (id, category) => {
    try {
      const response = await axios.delete(
        `/api/v1/edit/deleteCategory/${id}?category=${category}`
      );
      const { categories } = await response.data;
      dispatch({ type: DELETE_CATEGORY_BTN, payload: categories });
      alertMessages("success", response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const showForm = () => {
    dispatch({ type: SHOW_FORM });
  };

  const hideForm = () => {
    dispatch({ type: HIDE_FORM });
  };

  const editInput = (id) => {
    dispatch({ type: EDIT_INPUT, payload: id });
  };

  const deleteInput = async (bookID, id, category) => {
    try {
      const response = await axios.delete(
        `/api/v1/edit/${bookID}?id=${id}&category=${category}`
      );
      const { inputs } = await response.data;
      dispatch({ type: DELETE_NOTE, payload: inputs });
      alertMessages("success", response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const rateBook = async (id, rating) => {
    try {
      const response = await axios.post(
        `/api/v1/bookshelf/rateBook/${id}?rating=${rating}`
      );
      const { stars } = await response.data;
      dispatch({ type: RATE_BOOK, payload: stars });
      alertMessages("success", response.data.msg);
    } catch (error) {
      console.log(error);
    }
  };

  const stopEditing = () => {
    dispatch({ type: STOP_EDITING });
  };

  useEffect(() => {
    showCurrentUser();
  }, [state.user.email]);

  useEffect(() => {
    findAllFavouriteBooks();
    // eslint-disable-next-line
  }, [state.allBooks, state.allFavouriteBookIDs]);

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
        runModalFunctions,
        closeModal,
        backgroundsIsVisible,
        changeBackgroundIndex,
        changeUserNotifications,
        maxResults,
        searchTerm,
        searchAuthor,
        setMaxResults,
        page,
        setPage,
        setSearchAuthor,
        setSearchTerm,
        constructUrl,
        fetchAllBooksFromGoogle,
        fetchSingleBookFromGoogle,
        createBookPayload,
        removeFromFavourite,
        fetchAllFavouriteBooks,
        fetchSingleBookFromMongoDB,
        fetchUniqueIDs,
        changeToAddButton,
        changeToRemoveButton,
        getAllCategories,
        getNotes,
        changeCategory,
        deleteCategory,
        showForm,
        hideForm,
        editInput,
        deleteInput,
        rateBook,
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
