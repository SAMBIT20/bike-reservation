import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

const BikeCard = ({ bike, loadBike }) => {
  const [AllBike, setAllBike] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <div className="card mt-4" style={{ width: "18rem" }} key={bike.id}>
        {/* <img
          src="https://gifimage.net/wp-content/uploads/2017/09/bicicleta-gif-9.gif"
          className="card-img-top"
          alt="..."
        /> */}
        <div className="card-body">
          <h5 className="card-title">{bike.model}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Color: {bike.color}</li>
            <li className="list-group-item">Location: {bike.location}</li>
            <li className="list-group-item">
              AvgRating : {bike.avgRating}/5 ⭐
            </li>

            {bike.isAvailable === true ? (
              <li className="list-group-item ">
                Availablity:
                <span className="text-success"> Available</span>
              </li>
            ) : (
              <li className="list-group-item">
                Availablity:
                <span className="text-danger"> Not Available</span>
              </li>
            )}
            <li className="list-group-item"></li>
          </ul>

          <Link to={`/bike/${bike.id}`} className="btn btn-primary">
            Reserve
          </Link>

          {/* {user && user.userType === "admin" ? (
            <>
              <Link
                to={`/bike/edit/${bike.id}`}
                className="btn btn-outline-primary "
              >
                Edit
              </Link>
              <Link
                to={"/"}
                className="btn btn-danger"
                onClick={() => deleteBike(bike.id)}
              >
                Delete
              </Link>
            </>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </div>
  );
};

export default BikeCard;
