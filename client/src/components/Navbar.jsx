import { Link, useNavigate } from "react-router-dom";
import { ButtonPrimary } from "./utilities";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">🏨 BookingPage</span>
        </Link>
        {user ? (
          <div className="navItems">
            <div>{user.username}</div>
            <ButtonPrimary style={{ width: "100px" }} click={logout}>
              Logout
            </ButtonPrimary>
          </div>
        ) : (
          <div className="navItems">
            <ButtonPrimary style={{ width: "100px" }}>Register</ButtonPrimary>
            <ButtonPrimary
              style={{ width: "100px" }}
              click={() => navigate("/login")}
            >
              Login
            </ButtonPrimary>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
