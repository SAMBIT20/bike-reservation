import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import BikeService from "../../service/BikeService";
import ShowReview from "../review/ShowReview";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Bike = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [bike, setBike] = useState({
    model: "",
    color: "",
    location: "",
    avgRating: "",
    isAvailable: "",
  });

  const [reviews, setReviews] = useState([]);
  const [disableTime, setDisableTime] = useState([]);

  const day = new Date();
  let text = day.toISOString();
  let date = text.slice(0, 10);

  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  let text2 = nextDay.toISOString();
  let date2 = text2.slice(0, 10);

  const [times, setTimes] = useState({
    startTime: date,
    endTime: date2,
  });

  const { startTime, endTime } = times;

  useEffect(() => {
    loadBike();
    FetchReview();

    calculateAvailableDates();
  }, []);

  const loadBike = async () => {
    const bike = await BikeService.fetchBikes(id);
    setBike(bike);
  };

  const calculateAvailableDates = async () => {
    const data = await axios.get(
      `http://localhost:8000/api/reserve/bike/${id}/${startTime}/${endTime}`
    );
    setDisableTime(data.data);

    // console.log(data.data);
  };

  const reservation = async () => {
    if (startTime === "" || endTime === "") {
      alert("Please select a start and end time");
    } else {
      await axios.post(`http://localhost:8000/api/reserve/`, {
        startDate: startTime,
        endDate: endTime,
        userId: user.id,
        bikeId: id,
        userEmail: user.email,
        bikeModel: bike.model,
        status: "reserve",
      });
      navigate("/");
      setTimes({
        startTime: "",
        endTime: "",
      });
    }
  };

  const onInputChange = (e) => {
    setTimes({
      ...times,
      [e.target.name]: e.target.value,
    });
  };

  const FetchReview = async () => {
    const review = await BikeService.getBikeReviews(id);
    setReviews(review);
    return review;
  };

  const [datee, setDate] = useState(new Date());
  const handleChange = (date) => setDate(date);

  return (
    <div className="container my-4 review-wrapper">
      <div className="card" style={{ width: "50rem" }} key={bike.id}>
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
          <label htmlFor="appt" className="">
            Set yout time
          </label>
          <div>
            <input
              type="date"
              id="appt"
              name="startTime"
              className="form-control-lg my-2 mx-2"
              placeholder="Time"
              value={startTime}
              onChange={(e) => onInputChange(e)}
              required
            ></input>

            {/* <DatePicker
              className="border"
              selected={datee}
              onChange={handleChange}
              excludeDateIntervals={[
                {
                  start: new Date(disableTime.startDate),
                  end: new Date(disableTime.endDate),
                },
                // ...disableTime,
              ]}
            /> */}

            <span>TO</span>
            <input
              type="date"
              id="appt"
              name="endTime"
              className="form-control-lg my-2 mx-2"
              placeholder="Time"
              value={endTime}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div>
            {bike.isAvailable === true ? (
              <button className="btn btn-info" onClick={() => reservation()}>
                Reserve
              </button>
            ) : (
              <button className="btn btn-info" disabled>
                Reserve
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="comment-wrapper">
        <ShowReview reviews={reviews} />
      </div>
    </div>
  );
};

export default Bike;
