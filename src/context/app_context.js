import React, { useContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/app_reducer";
import { formatSearchValues } from "../utils/formatSearchValues";
import {
  SAVE_USER,
  REMOVE_USER,
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
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
  CHANGE_FAVOURITE_ICON_ON_LOAD,
  ADD_FAVOURITE_ICON,
  REMOVE_FAVOURITE_ICON,
} from "../actions";

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  isSidebar: false,
  user: {
    name: "gabor",
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
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchAuthor, setSearchAuthor] = useState("mark+lawrence");
  const [searchTerm, setSearchTerm] = useState("");
  const [maxResults, setMaxResults] = useState(10);

  let path;
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const key = process.env.REACT_APP_API_KEY;

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

  const createBookPayload = () => {
    dispatch({ type: CREATE_BOOK_PAYLOAD });
  };

  const saveBookPayload = async () => {
    try {
      if (state.bookPayload) {
        const { bookPayload } = state;
        await axios.post("http://localhost:5000/api/v1/bookshelf", {
          data: bookPayload,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllFavouriteBooks = async () => {
    dispatch({ type: FETCH_ALL_BOOKS_FROM_MONGODB_PENDING });
    try {
      const response = await axios("http://localhost:5000/api/v1/bookshelf");
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
      const response = await axios(
        `http://localhost:5000/api/v1/bookshelf/${id}`
      );
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
      await axios.delete(`http://localhost:5000/api/v1/bookshelf/${id}`);
    } catch (error) {
      dispatch({ type: FETCH_ALL_BOOKS_FROM_MONGODB_REJECTED, payload: error });
    }
  };

  const findFavourites = () => {
    dispatch({ type: CHANGE_FAVOURITE_ICON_ON_LOAD });
  };

  const addIcon = (id) => {
    dispatch({ type: ADD_FAVOURITE_ICON, payload: id });
  };

  const removeIcon = (id) => {
    dispatch({ type: REMOVE_FAVOURITE_ICON, payload: id });
  };

  useEffect(() => {
    fetchAllBooksFromGoogle();
    fetchAllFavouriteBooks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    findFavourites();
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
        saveUser,
        removeUser,
        openSidebar,
        closeSidebar,
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
        addIcon,
        removeIcon,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
