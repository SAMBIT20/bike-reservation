import axios from "axios";

// No Changes to be made in this function
export default class BikeService {
  static fetchBikes = async (id) => {
    const response = await axios.get(`http://localhost:8000/api/bike/${id}`, {
      withCredentials: true,
    });
    return response.data;
  };
  static fetchAllBikes = async (value) => {
    const response = await axios.get(
      `http://localhost:8000/api/bike?page=${value}`,
      { withCredentials: true }
    );
    return response.data;
  };

  static fetchAllBikesAdmin = async (value) => {
    const response = await axios.get(
      `http://localhost:8000/api/bike/admin?page=${value}`,
      { withCredentials: true }
    );
    return response.data;
  };

  static fetchFilteredBikes = async (filter) => {
    const response = await axios.post(
      `http://localhost:8000/api/bike/search`,
      {
        filter,
      },
      { withCredentials: true }
    );
    return response.data;
  };

  static totalBikes = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/bike/bikecount`,
      { withCredentials: true }
    );

    return response.data;
  };

  static updateIsAvailable = async (id, isAvailable) => {
    const response = await axios.put(
      `http://localhost:8000/api/bike/updateAval/${id}`,
      { isAvailable },
      { withCredentials: true }
    );
    return response.data;
  };

  static getBikeReviews = async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/review/bike/${id}`
    );
    return response.data;
  };
}
