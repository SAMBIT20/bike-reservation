import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddReview = () => {
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("user"));
  let today = new Date().toISOString().slice(0, 10);

  const { id } = useParams();

  const [review, setReview] = useState({
    user_id: users.id,
    bike_id: id,
    userName: users.name,
    comment: "",
    rating: "",
    created_at: today,
  });

  const [reviews, setReviews] = useState([]);

  const { user, comment, rating } = review;

  const onInputChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/review", review);
    navigate("/");
  };

  const checkReviewAdded = async () => {
    const data = await axios.get(
      `http://localhost:8000/api/review/user/${users.id}/bike/${id}`
    );

    setReviews(data.data);

    if (data.data.length > 0) {
      alert("You have already added a review for this bike");
      navigate("/bike/reservation");
    }
  };

  useEffect(() => {
    checkReviewAdded();
  }, []);

  return (
    <div>
      <div className="container mt-4 mb-4">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Add A Raview ⭐</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg mt-2"
                placeholder="username"
                name="user"
                value={users.email}
                // onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg mt-2"
                placeholder="comment"
                name="comment"
                value={comment}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                className="form-control form-control-lg  mt-2"
                placeholder="Rating from 1 to 5"
                name="rating"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <button className="btn btn-success btn-block  mt-4">
              Add Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
