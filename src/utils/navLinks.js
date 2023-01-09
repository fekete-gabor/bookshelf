import { NavLink } from "react-router-dom";

const links = [
  {
    id: 1,
    text: "Home",
    url: "/",
  },
  {
    id: 2,
    text: "Search",
    url: "/search",
  },
  {
    id: 3,
    text: "my bookshelf",
    url: "/my-bookshelf",
  },
  {
    id: 4,
    text: "how to use",
    url: "/how-to-use",
  },
];

export const navLinks = links.map((link) => {
  const { id, text, url } = link;

  return (
    <li key={id} className={({ isActive }) => isActive && "active-link"}>
      <NavLink to={url}>{text}</NavLink>
    </li>
  );
});
