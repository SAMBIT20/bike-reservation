import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

const AddBike = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["jwt"]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [bike, setBike] = useState({
    model: "",
    color: "",
    location: "",
    avgRating: "",
    isAvailable: "",
    userId: user.id,
  });

  const { model, color, location, avgRating, isAvailable } = bike;

  const onInputChange = (e) => {
    let { name, checked, value } = e.target;
    value = name === "isAvailable" ? checked : value;
    setBike({
      ...bike,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:8000/api/bike",

      bike
    );
    navigate("/");
  };

  return (
    <div>
      <div className="container my-4">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Add A Bike </h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg my-2"
                placeholder="Enter Your Model"
                name="model"
                value={model}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg my-2"
                placeholder="Enter Your Color"
                name="color"
                value={color}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg my-2"
                placeholder="Enter Your Location"
                name="location"
                value={location}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-lg my-2"
                placeholder="Enter Your  AvgRating"
                name="avgRating"
                value={avgRating}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>

            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                name="isAvailable"
                id="flexSwitchCheckChecked"
                checked={isAvailable}
                onChange={(e) => onInputChange(e)}
              />
              <label
                class="form-check-label text-success font-weight-bold"
                for="flexSwitchCheckChecked"
              >
                isAvailable
              </label>
            </div>
            <button className="btn btn-success btn-block">Add Bike</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBike;
