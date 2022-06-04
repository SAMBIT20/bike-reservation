import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState();
  const [userType, setUserType] = React.useState("");

  const [user, setUser] = React.useState();

  const id = useParams().id;

  const updateUser = async () => {
    await axios.patch(
      `http://localhost:8000/api/update/${id}`,
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
    updateUser();
    navigate("/user/alluser");
  };

  const getUser = async () => {
    const response = await axios(`http://localhost:8000/api/user/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setUser(response.data);
    setPassword(response.password);
    setUserType(response.data.userType);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <div>
        <div>
          <div className="form">
            <h3>Update User </h3>
            <form className="login-form" onSubmit={onClick}>
              <input
                type="text"
                placeholder="username"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                placeholder="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <select
                class="form-select mb-3"
                onChange={(e) => setUserType(e.target.value)}
                value={userType}
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <button>Update User</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
