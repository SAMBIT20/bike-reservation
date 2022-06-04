import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserCard = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState();

  const getUser = async () => {
    const response = await axios("http://localhost:8000/api/alluser");
    setUser(response.data);
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/api/user/${id}`);
    navigate("/user/alluser");
  };

  return (
    <div>
      <div className="user-wrapper">
        {user &&
          user.map((user) => (
            <div className="card mt-4 ms-2" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">Email: {user.email}</li>
                  <li className="list-group-item">UserType: {user.userType}</li>

                  <li className="list-group-item"></li>
                </ul>

                <>
                  <Link
                    to={`/user/update/${user.id}`}
                    className="btn btn-outline-primary "
                  >
                    Edit
                  </Link>
                  <Link
                    to={"/"}
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </Link>
                  <Link
                    to={`/reserve/allusers/${user.id}`}
                    className="btn btn-success"
                  >
                    Reservations
                  </Link>
                </>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserCard;
