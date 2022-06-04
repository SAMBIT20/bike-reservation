import axios from "axios";
import React, { useEffect, useState } from "react";

const Filter = ({ filter, setFilter, handleFilter }) => {
  const onInputChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <div className="filter-wrapper">
      <div class="container mt-4">
        <div class="row" id="filter">
          <form onSubmit={(e) => handleFilter(e)}>
            <div class="form-group col-sm-3 col-xs-6">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Model"
                name="model"
                value={filter.model}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div class="form-group col-sm-3 col-xs-6 ms-2">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Color"
                name="color"
                value={filter.color}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div class="form-group col-sm-3 col-xs-6 ms-2">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Location"
                name="location"
                value={filter.location}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div class="form-group col-sm-3 col-xs-6 ms-2">
              <input
                type="text"
                class="form-control"
                placeholder="Enter Average Rating"
                name="avgRating"
                value={filter.avgRating}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div>
              <button className="btn btn-primary filter-button">
                Search Filter
              </button>
            </div>
          </form>
        </div>
        <div class="row" id="products"></div>
      </div>
    </div>
  );
};

export default Filter;
