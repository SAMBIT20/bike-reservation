import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [userType, setUserType] = React.useState("");

  const SignUpUser = async (id) => {
    await axios.post(
      "http://localhost:8000/api/register",
      {
        name: name,
        email: email,
        password: password,
        userType: userType,
      },
      { withCredentials: true }
    );
  };
  //auth button handler
  const onClick = () => {
    SignUpUser();
    navigate("/user/alluser");
  };

  return (
    <div className="container">
      <div>
        <div>
          <div className="form">
            <h3>Create User </h3>
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

              <select
                class="form-select mb-3"
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <button>Create User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
