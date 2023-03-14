import {
  Navbar,
  Sidebar,
  Modal,
  Footer,
  ScrollTop,
  Backgrounds,
} from "../components";
import { Outlet } from "react-router-dom";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Backgrounds />
      <Sidebar />
      <Modal />
      <Outlet />
      <Footer />
      <ScrollTop />
    </>
  );
};

export default SharedLayout;
