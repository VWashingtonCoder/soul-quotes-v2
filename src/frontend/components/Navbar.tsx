import logo from "../../assets/images/logo.png";
import { useUsers } from "../../backend/context-hooks";

type NavbarProps = {
  page: string;
  changePage: (page: string) => void;
};

const navLinks = [
  { key: "home", text: "Home" },
  { key: "accounts", text: "Account" },
  { key: "favorites", text: "Favorites" },
  { key: "create", text: "Create" },
];

const Navbar = ({ page, changePage }: NavbarProps) => {
  const { activeUser, logoutUser } = useUsers();
  const { username } = activeUser;

  return (
    <header className="navbar flex-between-center">
      <div className="logo-box">
        <img src={logo} alt="site-logo" className="logo img" />
      </div>

      <nav className="nav-links flex-between-center">
        {navLinks.map((link) => {
          const { key } = link;
          const btnText = key === "accounts" && username ? "Logout" : link.text;

          return (
            <button
              key={key}
              className={`clear-btn nav-btn ${page === key ? "active" : ""}`}
              onClick={() => {
                key === "accounts" && username ? logoutUser() : changePage(key);
              }}
            >
              {btnText}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;
