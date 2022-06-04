import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");

  const SignUpUser = async (id) => {
    await axios.post(
      "http://localhost:8000/api/register",
      {
        name: name,
        email: email,
        password: password,
        userType: "user",
      },
      { withCredentials: true }
    );
  };
  //auth button handler
  const onClick = () => {
    SignUpUser();
    navigate("/auth");
  };

  return (
    <div className="not-found">
      <div className="signup-wrapper">
        <div className="login-page">
          <div className="form">
            <h3>Signup Yourself </h3>
            <form className="login-form" onSubmit={onClick}>
              <input
                type="text"
                placeholder="username"
                required
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <button>Signup</button>
            </form>
            <p class="message">
              Already registered? <Link to={"/auth"}>Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
