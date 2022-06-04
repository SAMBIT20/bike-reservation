import React from "react";

const ShowReview = ({ reviews }) => {
  return (
    <div>
      <div className="highlit-review">
        {reviews &&
          reviews.map((rev, index) => (
            <div class="row mt-4">
              <div class="col-sm-6">
                <div class="card card-rev">
                  <div class="card-body">
                    <h5 class="card-title">@{rev.userName}</h5>
                    <p class="card-text">
                      {" "}
                      <span className="text-primary">Comment:</span>{" "}
                      {rev.comment}
                    </p>
                    <p class="card-text">
                      {" "}
                      <span className="text-primary">Rating:</span> {rev.rating}
                    </p>
                    <p class="card-text">{rev.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ShowReview;
