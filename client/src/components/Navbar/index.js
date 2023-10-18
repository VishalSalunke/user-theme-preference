import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";

import { AuthContext } from "../../contexts/authContext";
import "./index.css";

const UPDATE_THEME = gql`
  mutation updateUserTheme($themeInput: ThemeInput) {
    updateUserTheme(themeInput: $themeInput) {
      email
      theme
    }
  }
`;

function Navbar({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutUser = () => {
    context.logout();
    navigate("./login");
  };

  const [updateUserTheme] = useMutation(UPDATE_THEME, {
    update(proxy, { data: { updateUserTheme: userData } }) {
      context.themeUpdate(userData?.theme);
    },
  });

  const handleThemeChange = (theme) => {
    updateUserTheme({
      variables: { themeInput: { email: user?.email, theme } },
    });
  };
  return (
    <>
      {user ? (
        <nav className="navbar">
          <div className="logo"></div>
          <ul className="nav-links">
            <li>
              <span
                className="main-menu"
                onMouseOver={() => setShowMenu(true)}
                onMouseLeave={() => {
                  setTimeout(() => {
                    setShowMenu(false);
                  }, 2000);
                }}
              >
                Themes
              </span>
              {showMenu ? (
                <div className="theme-menu">
                  <div
                    className="theme-menu-item"
                    onClick={() => handleThemeChange("dark")}
                  >
                    {" "}
                    Dark{" "}
                  </div>
                  <div
                    className="theme-menu-item"
                    onClick={() => handleThemeChange("light")}
                  >
                    {" "}
                    Light{" "}
                  </div>
                </div>
              ) : null}
            </li>
            <li>
              <span className="main-menu" onClick={logoutUser}>
                Logout
              </span>
            </li>
          </ul>
        </nav>
      ) : null}
    </>
  );
}

export default Navbar;
