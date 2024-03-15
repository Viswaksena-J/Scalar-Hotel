import React, { useState, useEffect } from "react";
import axios from "axios";
import BookingCard from "../components/Booking";
import { toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

const Bookings = () => {
  function getDate(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16);
  }

  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filterRoomNumber, setFilterRoomNumber] = useState("");
  const [filterRoomType, setFilterRoomType] = useState("");
  const [filterStartTime, setFilterStartTime] = useState("");
  const [filterEndTime, setFilterEndTime] = useState("");

  useEffect(() => {
    fetchBookings();
    fetchRooms();
  }, []);

  const fetchBookings = () => {
    axios
      .get("https://scalar-hotel-api.vercel.app/bookings")
      .then((response) => {
        setBookings(response.data);
      });
  };

  const fetchRooms = () => {
    axios.get("https://scalar-hotel-api.vercel.app/rooms").then((response) => {
      setRooms(response.data);
    });
  };

  const filterBookings = () => {
    let filteredBookings = bookings;

    if (filterRoomNumber) {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.roomNumber === filterRoomNumber
      );
    }

    if (filterRoomType) {
      filteredBookings = filteredBookings.filter((booking) =>
        rooms.some(
          (room) =>
            room.roomNumber === booking.roomNumber &&
            room.roomType === filterRoomType
        )
      );
    }

    if (filterStartTime) {
      console.log("Filtering by start time:", filterStartTime);
      filteredBookings = filteredBookings.filter(
        (booking) => new Date(booking.startTime) >= new Date(filterStartTime)
      );
    }

    if (filterEndTime) {
      console.log("Filtering by end time:", filterEndTime);
      filteredBookings = filteredBookings.filter(
        (booking) => new Date(booking.endTime) <= new Date(filterEndTime)
      );
    }

    filteredBookings.sort(
      (a, b) => new Date(a.startTime) - new Date(b.startTime)
    );

    return filteredBookings;
  };

  function notify(temp) {
    if (parseInt(temp) < 24) toast.info("Booking Deleted - NO REFUND");
    else if (parseInt(temp) < 48)
      toast.info("Booking Deleted - Partial REFUND");
    else toast.info("Booking Deleted - Full REFUND");
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you want to continue delete the booking") === true) {
      axios
        .get(`https://scalar-hotel-api.vercel.app/bookings/${id}`)
        .then((response) => {
          let currentDate = new Date();
          currentDate = getDate(currentDate);
          let createdAt = getDate(response.data.startTime);
          const milliseconds = Math.abs(
            Date.parse(currentDate) - Date.parse(createdAt)
          );
          let temp = milliseconds / 36e5;

          notify(temp);
        });

      axios
        .delete(`https://scalar-hotel-api.vercel.app/bookings/${id}`)
        .then(() => {
          setBookings(bookings.filter((booking) => booking._id !== id));
        });
    }
  };

  const filteredBookings = filterBookings();

  return (
    <div>
      <h2 className="text-3xl align-center justify-center font-bold text-center text-gray-800 mt-1">
        View Bookings
      </h2>
      <Form>
        <Form.Group>
          <Form.Label>Filter by Room Number</Form.Label>
          <Form.Control
            as="select"
            value={filterRoomNumber}
            onChange={(e) => setFilterRoomNumber(e.target.value)}
          >
            <option value="">All</option>
            {rooms.map((room) => (
              <option key={room.roomNumber} value={room.roomNumber}>
                {room.roomNumber}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Filter by Room Type</Form.Label>
          <Form.Control
            as="select"
            value={filterRoomType}
            onChange={(e) => setFilterRoomType(e.target.value)}
          >
            <option value="">All</option>
            {Array.from(new Set(rooms.map((room) => room.roomType))).map(
              (roomType) => (
                <option key={roomType} value={roomType}>
                  {roomType}
                </option>
              )
            )}
          </Form.Control>
        </Form.Group>

        <Form.Group>
          <Form.Label>Filter by Start Time</Form.Label>
          <Form.Control
            type="date"
            value={filterStartTime}
            onChange={(e) => setFilterStartTime(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Filter by End Time</Form.Label>
          <Form.Control
            type="date"
            value={filterEndTime}
            onChange={(e) => setFilterEndTime(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Container className="container flex">
        {filteredBookings.map((booking) => (
          <div className="item" key={booking._id}>
            <BookingCard booking={booking} />
            <button
              className="btn btn-danger btn1 mt-2 mb-2"
              onClick={() => handleDelete(booking._id)}
            >
              Delete Booking
            </button>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Bookings;
