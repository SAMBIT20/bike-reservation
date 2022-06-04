import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import BikeCard from "../components/home/BikeCard";
import Filter from "../components/home/Filter";
import BikeService from "../service/BikeService";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBikes();
    handleFilter();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchBikes = async (page) => {
    if (user && user.userType === "admin") {
      const response = await BikeService.fetchAllBikesAdmin(page);
      setData(response);
      totalNumberOfBikes();
    } else {
      const bike = await BikeService.fetchAllBikes(page);
      setData(bike);
      totalNumberOfBikes();
    }
  };

  const totalNumberOfBikes = async () => {
    const total = await BikeService.totalBikes();
    setPage(total / 10);
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    fetchBikes(currentPage);
  };

  const [filter, setFilter] = useState({
    model: "",
    color: "",
    location: "",
    avgRating: "",
  });

  const handleFilter = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/api/bike/search",
      filter,
      { withCredentials: true }
    );
    setData(response.data);
  };

  return (
    <div className="container">
      <div className="filter-container">
        <Filter
          data={data}
          setData={setData}
          handleFilter={handleFilter}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="py-4 bike-wrapper">
        {data.map((bike) => {
          return <BikeCard bike={bike} loadBike={fetchBikes} />;
        })}
      </div>

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

export default Home;
