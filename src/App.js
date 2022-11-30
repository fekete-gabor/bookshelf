import {
  Landing,
  Login,
  Register,
  VerifyEmail,
  ResetPassword,
  ForgotPassword,
  Error,
  ProtectedRoute,
  SharedLayout,
  Home,
  Search,
  SingleBookPage,
  MyBookshelf,
  HowToUse,
} from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          {/* END OF PUBLIC ROUTES */}
          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<SharedLayout />}>
              <Route index path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search/:id" element={<SingleBookPage />} />
              <Route path="/my-bookshelf" element={<MyBookshelf />} />
              <Route path="/how-to-use" element={<HowToUse />} />
            </Route>
          </Route>
          {/* END OF PROTECTED ROUTES */}
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
};

export default App;
