import "../node_modules/bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/layout/Navbar";
import AddBike from "./components/bike/AddBike";
import EditBike from "./components/bike/EditBike";
import Bike from "./components/bike/Bike";
import AllBike from "./components/bike/AllBike";
import AllUsers from "./components/bike/AllUsers";
import Login from "./pages/Login";
import { useCookies } from "react-cookie";
import SignUp from "./pages/SignUp";
import axios from "axios";
import MyReservation from "./components/bike/MyReservation";
import AddReview from "./pages/AddReview";
import AllUser from "./pages/AllUser";
import UpdateUser from "./components/user/UpdateUser";
import AllBikes from "./pages/AllBikes";

const App = () => {
  const [auth, setAuth] = useState(null);
  const [cookies, setCookie] = useCookies(["jwt"]);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    const response = await axios.get(
      "http://localhost:8000/api/user",

      {
        headers: { cookie: cookies },
        withCredentials: true,
      }
    );
    setUser(response.data);
    saveUser(response.data);
  };

  //save user in localstorage
  const saveUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (cookies.jwt) {
      setAuth(true);
    }
    getUser();
  }, []);

  return (
    <div className="App">
      <Navbar logout={() => setAuth(false)} />
      {/* <Routes>
     
      </Routes> */}
      <Routes>
        {!cookies.jwt && (
          <>
            <Route
              path="/login"
              element={<Login authenticate={() => setAuth(true)} />}
            />
            <Route path="/signup" element={<SignUp />} />
          </>
        )}

        {cookies.jwt && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/bike/:id" element={<Bike />} />
            <Route path="/bike/add" element={<AddBike />} />
            <Route path="bike/all-bikes" element={<AllBikes />} />
            <Route path="/reserve/allbikes/:id" element={<AllBike />} />
            <Route path="/reserve/allusers/:id" element={<AllUsers />} />
            <Route path="/bike/edit/:id" element={<EditBike />} />
            <Route path="/bike/reservation" element={<MyReservation />} />
            <Route path="/review/:id" element={<AddReview />} />
            <Route path="user/alluser" element={<AllUser />} />
            <Route path="user/update/:id" element={<UpdateUser />} />
          </>
        )}
        <Route
          path="*"
          element={<Navigate to={cookies.jwt ? "/" : "/login"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
