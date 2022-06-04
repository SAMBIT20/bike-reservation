import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BikeService from "../../service/BikeService";

const EditBike = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bike, setBike] = useState({
    model: "",
    color: "",
    location: "",
    avgRating: "",
    isAvailable: "",
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
    await axios.put(`http://localhost:8000/api/bike/${id}`, bike);
    navigate("/");
  };

  useEffect(() => {
    loadBike();
  }, []);

  const loadBike = async () => {
    const bike = await BikeService.fetchBikes(id);
    setBike(bike);
  };

  return (
    <div>
      <div className="container my-4">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Edit the Bike </h2>
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
                min={1}
                max={5}
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

            <button className="btn btn-warning btn-block">Edit Bike</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBike;
