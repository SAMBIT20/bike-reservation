import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReserveService from "../../service/ReserveService";

const AllUsers = () => {
  const [AllUsers, setAllUsers] = useState([]);

  const id = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const reservation = await ReserveService.findReserveByUserId(id.id);
    setAllUsers(reservation);
    console.log(reservation);
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>All Reserved User</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">BikeModel</th>
              <th scope="col">UserName</th>
              <th scope="col">StartTime</th>
              <th scope="col">EndTime</th>
              <th scope="col">Status</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {AllUsers.map((bike, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{bike.bikeModel}</td>
                <td>{bike.userEmail}</td>
                <td>{bike.startDate}</td>
                <td>{bike.endDate}</td>
                <td>
                  <span class="badge rounded-pill bg-primary">
                    {bike.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
