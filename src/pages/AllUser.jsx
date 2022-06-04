import React from "react";
import CreateUser from "../components/user/CreateUser";
import UserCard from "../components/user/UserCard";

const AllUser = () => {
  return (
    <div className="user-container">
      <UserCard />
      <CreateUser />
    </div>
  );
};

export default AllUser;
