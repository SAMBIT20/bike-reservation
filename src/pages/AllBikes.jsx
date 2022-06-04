import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import BikeService from "../service/BikeService";
import axios from "axios";

const AllBikes = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBikes();
  }, []);

  const deleteBike = async (id) => {
    await axios.delete(
      `http://localhost:8000/api/bike/${id}`,

      { withCredentials: true }
    );
    fetchBikes();
  };

  const fetchBikes = async (page) => {
    const response = await BikeService.fetchAllBikesAdmin(page);
    setData(response);
    totalNumberOfBikes();
  };

  const totalNumberOfBikes = async () => {
    const total = await BikeService.totalBikes();
    setPage(total / 10);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    fetchBikes(currentPage);
  };

  return (
    <div className="container mt-4">
      <table class="table border shadow">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Model</th>
            <th scope="col">Color</th>
            <th scope="col">Location</th>
            <th scope="col">AvgRating</th>
            <th scope="col">Available</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((bike, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{bike.model}</td>
              <td>{bike.color}</td>
              <td>{bike.location}</td>
              <td>{bike.avgRating}</td>
              <td>{bike.isAvailable === true ? "Yes" : "No"}</td>
              <td>
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

                <Link
                  className="btn btn-success"
                  to={`/reserve/allbikes/${bike.id}`}
                >
                  All Reservation
                </Link>
              </td>
              <td>
                <span class="badge rounded-pill bg-primary">{bike.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={page}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default AllBikes;
