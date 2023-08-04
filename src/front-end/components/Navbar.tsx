import { useUsersContext } from "../../backend/custom-hooks";
import { User } from "../../../types";

type NavProps = {
  page: string;
  changePage: React.Dispatch<React.SetStateAction<string>>;
};

const navLinks = [
  { key: "home", text: "Home" },
  { key: "account", text: "Account" },
  { key: "favorites", text: "Favorites" }
];

export default function Navbar({ page, changePage }: NavProps) {
  const { activeUser, removeActiveUser } = useUsersContext();
  const userId = activeUser ? activeUser.userId : "";

  const handlePageChange = (page: string) => {
    if (!userId && page === "favorites") {
      alert("You must be logged in to view this page.");
    } else if (userId && page === "account") {
      removeActiveUser();
      changePage("home");
    } else changePage(page);
  };

  return (
    <nav className="nav-links">
      {navLinks.map((link) => {
        const { key } = link;
        const btnText = key === "account" && userId ? "Logout" : link.text;
        return (
          <button
            key={key}
            className={`nav-btn ${page === key ? "active" : ""}`}
            onClick={() => handlePageChange(key)}
          >
            {btnText}
          </button>
        );
      })}
    </nav>
  );
}