import axios from "axios";

// No Changes to be made in this function
export default class ReserveService {
  static fetchAllReserve = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/reserve`,

      { withCredentials: true }
    );
    return response.data;
  };
  static fetchReserveById = async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/reserve/${id}`,
      { withCredentials: true }
    );
    return response.data;
  };

  static fetchMyAllReserve = async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/reserve/user/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  };

  static cancelReservation = async (id) => {
    const response = await axios.patch(
      `http://localhost:8000/api/reserve/${id}`,
      {
        status: "cancelled",
      },
      { withCredentials: true }
    );
    return response.data;
  };

  static findReserveByUserId = async (userId) => {
    const response = await axios.get(
      `http://localhost:8000/api/reserve/user/${userId}`,
      { withCredentials: true }
    );
    return response.data;
  };

  static findReserveByBikeId = async (bikeId) => {
    const response = await axios.get(
      `http://localhost:8000/api/reserve/bike/${bikeId}`,
      { withCredentials: true }
    );
    return response.data;
  };
}
