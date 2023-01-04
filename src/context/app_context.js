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
  CREATE_FAVOURITE_BOOK,
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
  favouriteBook: null,
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

  const createFavouriteBook = () => {
    dispatch({ type: CREATE_FAVOURITE_BOOK });
  };

  // const getFavouriteBooks = async () => {
  //   try {
  //     const response = await axios("http://localhost:5000/api/v1/bookshelf");
  //     const { books } = response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const saveFavouriteBook = async () => {
    try {
      if (state.favouriteBook) {
        const { favouriteBook } = state;
        await axios.post("http://localhost:5000/api/v1/bookshelf", {
          data: favouriteBook,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavouriteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/bookshelf/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
    // getFavouriteBooks();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    saveFavouriteBook();
    // eslint-disable-next-line
  }, [state.favouriteBook]);

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
        createFavouriteBook,
        removeFavouriteBook,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
