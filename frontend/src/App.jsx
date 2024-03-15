import "./App.css";
import Navigation from "./components/Navigation";
import RoomList from "./pages/ViewRooms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookings from "./pages/ViewBooking";
import BookingForm from "./pages/AddBooking";
import UpdateBookingForm from "./pages/UpdateBooking";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleRoomDetails from "./pages/SingleRoomDetails";

function App() {
  return (
    <>
      <div className="container">
        <Router>
          <ToastContainer />
          <Navigation />
          <Routes>
            <Route exact path="/" element={<RoomList />} />
            <Route path="/details" element={<SingleRoomDetails />} />
            <Route path="/view" element={<Bookings />} />
            <Route path="/add" element={<BookingForm />} />
            <Route path="/update" element={<UpdateBookingForm />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
