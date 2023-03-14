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
];

export const navLinks = links.map((link) => {
  const { id, text, url } = link;

  return (
    <li key={id}>
      <NavLink
        to={url}
        className={({ isActive }) => (isActive ? "active-link" : undefined)}
      >
        {text}
      </NavLink>
    </li>
  );
});
