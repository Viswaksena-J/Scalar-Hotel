import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";
import { Row } from "react-bootstrap";

const BookingForm = () => {
  const roomNumber = useLocation().state.roomNumber;
  const pricePerHour = useLocation().state.pricePerHour;
  const navigate = useNavigate();
  const [postAdded, setPostAdded] = useState(false);
  const [priceDisplay, setPriceDisplay] = useState(0);
  const [booking, setBooking] = useState({
    email: "",
    userName: "",
    roomNumber: roomNumber,
    startTime: "",
    endTime: "",
    price: 0,
    paymentType: "",
    tip: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
  };

  useEffect(() => {
    if (postAdded) {
      navigate("/view");
    }
  }, [postAdded, navigate]);

  useEffect(() => {
    if (booking.endTime === "" || booking.startTime === "") return;
    const milliseconds = Math.ceil(
      Math.abs(Date.parse(booking.endTime) - Date.parse(booking.startTime))
    );
    const hours = Math.ceil(milliseconds / 36e5);
    const priceDisplay = hours * pricePerHour;
    setPriceDisplay(priceDisplay);
  }, [booking, pricePerHour]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const milliseconds = Math.ceil(
      Math.abs(Date.parse(booking.endTime) - Date.parse(booking.startTime))
    );
    const hours = Math.ceil(milliseconds / 36e5);
    const price = hours * pricePerHour;
    const updatedBooking = { ...booking, price };
    try {
      const response = await axios.post("/bookings", updatedBooking);
      if (response.data._id !== undefined) {
        toast.success("Booking Made");
        setPostAdded(true);

        if (booking.email.trim() !== "") {
          const templateParams = {
            from_name: "Scaler Hotel",
            email: booking.email,
            message: `Dear ${
              booking.userName
            },\n\nThank you for choosing our hotel. Your booking details are as follows:\n\nRoom Number: ${
              booking.roomNumber
            }\nStart Time: ${new Date(
              booking.startTime
            ).toLocaleString()}\nEnd Time: ${new Date(
              booking.endTime
            ).toLocaleString()}\n\nWe look forward to welcoming you at our hotel. If you have any questions 
            or need further assistance, feel free to contact us.\n\nBest regards,\nScaler Hotels`,
          };

          await emailjs.send(
            "service_q63ssv9",
            "template_rqireru",
            templateParams,
            "rHsabqnKHqIolh4dh"
          );
          console.log("Email sent successfully!");
        } else {
          console.log("Email address is empty, skipping email sending.");
        }
      } else {
        toast.error("Booking Failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit} id="form">
      <h1 className="text-4xl text-center font-bold mt-2">Add Booking</h1>

      <Row className="mb-2 mt-2">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={booking.email}
            name="email"
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label className="mt-2">Guest Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={booking.userName}
            name="userName"
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicRoomNumber">
          <Form.Label className="mt-2">Room Number:</Form.Label>
          <Form.Control
            type="text"
            name="roomNumber"
            value={booking.roomNumber}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
      </Row>

      <Form.Group controlId="formBasicStartTime">
        <Form.Label>Start Time:</Form.Label>
        <Form.Control
          type="datetime-local"
          name="startTime"
          value={booking.startTime}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicEndTime">
        <Form.Label>End Time:</Form.Label>
        <Form.Control
          type="datetime-local"
          name="endTime"
          value={booking.endTime}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPrice">
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="text"
          name="price"
          value={priceDisplay}
          required
          disabled
        />
      </Form.Group>

      <Form.Group controlId="formBasicPaymentType">
        <Form.Label>Payment Type:</Form.Label>
        <Form.Control
          as="select"
          name="paymentType"
          value={booking.paymentType}
          onChange={handleInputChange}
        >
          <option>Card</option>
          <option>UPI</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formBasicTip">
        <Form.Label>Tip:</Form.Label>
        <Form.Control
          type="number"
          name="tip"
          value={booking.tip}
          onChange={handleInputChange}
        />
        <Form.Text className="text-muted">
          A tip is not required but is appreciated
        </Form.Text>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        id="button"
        className="bg-blue-500 text-white mt-2 active:bg-blue-600"
      >
        Confirm Booking
      </Button>
    </Form>
  );
};

export default BookingForm;
