import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReserveService from "../../service/ReserveService";

const MyReservation = () => {
  const navigate = useNavigate();
  const [AllBike, setAllBike] = useState([]);
  const [myUser, setMyUser] = useState([]);

  useEffect(() => {
    fetchMyReservation();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const fetchMyReservation = async () => {
    const response = await ReserveService.fetchMyAllReserve(user.id);
    setAllBike(response);
  };

  //get user from localstorage
  const getUserFromLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    setMyUser(user);
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  const cancelReservation = async (id) => {
    const response = await ReserveService.cancelReservation(id);
    fetchMyReservation();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>All My Bookings</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">BikeModel</th>
              <th scope="col">StartTime</th>
              <th scope="col">EndTime</th>
              <th scope="col">Status</th>
              <th scope="col">Acitivity</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {AllBike.map((bike, index) => (
              <tr>
                {bike.userEmail === myUser.email ? (
                  <>
                    <th scope="row">{index + 1}</th>
                    <td>{bike.bikeModel}</td>
                    <td>{bike.startDate}</td>
                    <td>{bike.endDate}</td>
                    <td>{bike.status}</td>

                    <td>
                      {bike.status !== "cancelled" ? (
                        <>
                          <button
                            className="btn btn-warning"
                            onClick={() => cancelReservation(bike.id)}
                          >
                            Cancel
                          </button>

                          <button
                            className="btn btn-success"
                            onClick={() => {
                              navigate(`/review/${bike.bikeId}`);
                            }}
                          >
                            Add A Review
                          </button>
                        </>
                      ) : (
                        ""
                      )}
                    </td>
                  </>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReservation;
