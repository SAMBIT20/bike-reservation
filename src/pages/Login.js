import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { useCookies } from "react-cookie";
import axios, { Axios, AxiosError } from "axios";
const Login = ({ authenticate }) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handelLogin = async (e) => {
    e.preventDefault();
    const data = await axios.post(
      "http://localhost:8000/api/login",
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );

    function CreateCookie() {
      setCookie("jwt", data.data.jwt, {
        path: "/",
      });
    }

    CreateCookie();

    console.log(data);
    authenticate();
  };

  return (
    <div className="not-found">
      <div className="auth-wrapper">
        <div className="login-page">
          <div className="form">
            <h3>Authenticate Yourself </h3>
            <form className="login-form" onSubmit={handelLogin}>
              <input
                type="email"
                placeholder="username"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <button>login</button>
            </form>
            <p class="message">
              Not registered? <Link to={"/signup"}>Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
