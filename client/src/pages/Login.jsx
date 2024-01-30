import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import ButtonPrimary from "../components/utilities/ButtonPrimary";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);

  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <div className="password">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <span onClick={() => setShow(!show)}>{show ? "hide" : "view"}</span>
        </div>
        <ButtonPrimary
          style={{ padding: "0.5rem" }}
          click={handleLogin}
          disabled={loading}
        >
          Login
        </ButtonPrimary>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};
export default Login;
