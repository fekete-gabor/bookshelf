import React, { useContext, useState, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/app_reducer";
import { formatSearchValues } from "../utils/formatSearchValues";
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
  SAVE_SINGLE_ITEM,
} from "../actions";

const AppContext = React.createContext();

const initialState = {
  isLoading: false,
  isSidebar: false,
  user: {
    name: "gabor",
  },
  books: [],
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
  savedItem: {},
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchAuthor, setSearchAuthor] = useState("");
  const [searchTerm, setSearchTerm] = useState("metro");
  const [maxResults, setMaxResults] = useState(10);

  let path;
  const baseUrl = `https://www.googleapis.com/books/v1/volumes`;
  const key = "AIzaSyDDB2x_90FEK4Hc2YlVSbFX_541hppC2Qg";

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

  const fetchBooks = async () => {
    dispatch({ type: FETCH_PENDING });
    try {
      const url = await constructUrl();
      const response = await axios(url);
      const payload = await response.data.items;
      dispatch({ type: FETCH_SUCCESSFUL, payload });
    } catch (error) {
      dispatch({ type: FETCH_REJECTED, payload: error });
    }
  };

  const fetchSingleBook = async (id) => {
    dispatch({ type: FETCH_SINGLE_BOOK_PENDING });
    try {
      const response = await axios(`${baseUrl}/${id}?key=${key}`);
      const data = await response.data.volumeInfo;
      const payload = { id, data };
      dispatch({ type: FETCH_SINGLE_BOOK_SUCCESSFUL, payload });
    } catch (error) {
      dispatch({ type: FETCH_SINGLE_BOOK_REJECTED, payload: error });
    }
  };

  const saveItem = () => {
    dispatch({ type: SAVE_SINGLE_ITEM });
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

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
        fetchBooks,
        fetchSingleBook,
        saveItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
