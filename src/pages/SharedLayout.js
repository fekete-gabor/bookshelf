import { Navbar, Sidebar, Footer, ScrollTop } from "../components";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
      <ScrollTop />
    </>
  );
};

export default SharedLayout;
