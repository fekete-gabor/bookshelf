import { Navbar, Sidebar, Modal, Footer, ScrollTop } from "../components";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Modal />
      <Outlet />
      <Footer />
      <ScrollTop />
    </>
  );
};

export default SharedLayout;
