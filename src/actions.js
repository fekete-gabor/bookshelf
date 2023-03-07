const FETCH_CURRENT_USER_PENDING = "FETCH_CURRENT_USER_PENDING";
const FETCH_CURRENT_USER_SUCCESSFUL = "FETCH_CURRENT_USER_SUCCESSFUL";
const FETCH_CURRENT_USER_REJECTED = "FETCH_CURRENT_USER_REJECTED";
const VERIFY_EMAIL_PENDING = "VERIFY_EMAIL_PENDING";
const VERIFY_EMAIL_SUCCESSFUL = "VERIFY_EMAIL_SUCCESSFUL";
const VERIFY_EMAIL_REJECTED = "VERIFY_EMAIL_REJECTED";
const SAVE_USER = "SAVE_USER";
const REMOVE_USER = "REMOVE_USER";
const OPEN_SIDEBAR = "OPEN_SIDEBAR";
const CLOSE_SIDEBAR = "CLOSE_SIDEBAR";
const OPEN_MODAL = "OPEN_MODAL";
const RUN_MODAL_FUNCTIONS = "RUN_MODAL_FUNCTIONS";
const CLOSE_MODAL = "CLOSE_MODAL";
const CHANGE_USER_NOTIFICATION = "CHANGE_USER_NOTIFICATION";

// FETCH BOOKS FROM GOOGLE API
const FETCH_ALL_BOOKS_FROM_GOOGLE_PENDING =
  "FETCH_ALL_BOOKS_FROM_GOOGLE_PENDING";
const FETCH_ALL_BOOKS_FROM_GOOGLE_SUCCESSFUL =
  "FETCH_ALL_BOOKS_FROM_GOOGLE_SUCCESSFUL";
const FETCH_ALL_BOOKS_FROM_GOOGLE_REJECTED =
  "FETCH_ALL_BOOKS_FROM_GOOGLE_REJECTED";
const FETCH_SINGLE_BOOK_FROM_GOOGLE_PENDING =
  "FETCH_SINGLE_BOOK_FROM_GOOGLE_PENDING";
const FETCH_SINGLE_BOOK_FROM_GOOGLE_SUCCESSFUL =
  "FETCH_SINGLE_BOOK_FROM_GOOGLE_SUCCESSFUL";
const FETCH_SINGLE_BOOK_FROM_GOOGLE_REJECTED =
  "FETCH_SINGLE_BOOK_FROM_GOOGLE_REJECTED";
const CREATE_BOOK_PAYLOAD = "CREATE_BOOK_PAYLOAD";

// FETCH BOOKS FROM MONGO DB
const FETCH_ALL_BOOKS_FROM_MONGODB_PENDING =
  "FETCH_ALL_BOOKS_FROM_MONGODB_PENDING";
const FETCH_ALL_BOOKS_FROM_MONGODB_SUCCESSFUL =
  "FETCH_ALL_BOOKS_FROM_MONGODB_SUCCESSFUL";
const FETCH_ALL_BOOKS_FROM_MONGODB_REJECTED =
  "FETCH_ALL_BOOKS_FROM_MONGODB_REJECTED";
const FETCH_SINGLE_BOOK_FROM_MONGODB_PENDING =
  "FETCH_SINGLE_BOOK_FROM_MONGODB_PENDING";
const FETCH_SINGLE_BOOK_FROM_MONGODB_SUCCESSFUL =
  "FETCH_SINGLE_BOOK_FROM_MONGODB_SUCCESSFUL";
const FETCH_SINGLE_BOOK_FROM_MONGODB_REJECTED =
  "FETCH_SINGLE_BOOK_FROM_MONGODB_REJECTED";

// FAVOURITE BOOK EDIT FUNCTIONS
const FETCH_ALL_CATEGORY_BTNS = "FETCH_ALL_CATEGORY_BTNS";
const FETCH_ALL_NOTES = "FETCH_ALL_NOTES";
const DELETE_CATEGORY_BTN = "DELETE_CATEGORY_BTN";
const DELETE_NOTE = "DELETE_NOTE";
const RATE_BOOK = "RATE_BOOK";
const CHANGE_CATEGORY = "CHANGE_CATEGORY";
const SHOW_FORM = "SHOW_FORM";
const HIDE_FORM = "HIDE_FORM";
const EDIT_INPUT = "EDIT_INPUT";
const STOP_EDITING = "STOP_EDITING";

// CHANGE FAVOURITE ICONS
const FETCH_ALL_IDS_FROM_MONGODB_PENDING = "FETCH_ALL_IDS_FROM_MONGODB_PENDING";
const FETCH_ALL_IDS_FROM_MONGODB_SUCCESSFUL =
  "FETCH_ALL_IDS_FROM_MONGODB_SUCCESSFUL";
const FETCH_ALL_IDS_FROM_MONGODB_REJECTED =
  "FETCH_ALL_IDS_FROM_MONGODB_REJECTED";
const CHANGE_FAVOURITE_ICON_ON_LOAD = "CHANGE_FAVOURITE_ICON_ON_LOAD";
const ADD_FAVOURITE_ICON = "ADD_FAVOURITE_ICON";
const REMOVE_FAVOURITE_ICON = "REMOVE_FAVOURITE_ICON";

export {
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
};
