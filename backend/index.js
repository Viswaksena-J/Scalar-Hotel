const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Room = require("./models/Rooms");
const Booking = require("./models/Booking");

require("dotenv").config();

const mongodbURL = "mongodb+srv://sushanth123:sushanth123@sumanth1.apxwy1f.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.port || 9000;

const app = express();

// Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');  
  next();
});

app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Default route
app.get("/", (req, res) => {
  res.send("The backend server is working!");
});

// Define routes for rooms and bookings
// Get rooms
app.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single room
app.get("/rooms/:roomNumber", async (req, res) => {
  try {
    const room = await Room.findOne({ roomNumber: req.params.roomNumber });
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a room
app.post("/rooms", async (req, res) => {
  const room = new Room({
    roomNumber: req.body.roomNumber,
    roomType: req.body.roomType,
    pricePerHour: req.body.pricePerHour,
  });

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a room
app.delete("/rooms/:roomNumber",async (req,res) => {
  const room = await Room.findOne({ roomNumber: req.params.roomNumber });
  if(!room){
    res.status(404).json({ message: "Room not found" });
  } else {
    try {
      await room.deleteOne();
      res.json({ message: "Room deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
})

//Get all bookings
app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate("roomNumber");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get single booking
app.get("/bookings/:id", async (req, res) => {
  try {
    const book = await Booking.findOne({ _id: req.params.id });
    if(book){
    res.json(book);
  } else {
    res.status(404).json({ message: "Booking not found" });
  }
} catch (err) {
  res.status(500).json({ message: err.message });
}
});

// Add a booking
app.post("/bookings", async (req, res) => {
  const room = await Room.findOne({ roomNumber: req.body.roomNumber });
  const existingBooking = await Booking.findOne({
    roomNumber: req.body.roomNumber,
    startTime: { $lt: req.body.endTime },
    endTime: { $gt: req.body.startTime },
  });
  if (existingBooking) {
    res.status(400).json({ message: "Room is already booked" });
  } else if (!room) {
    res.status(400).json({ message: "Room does not exist" });
  } else {
    const booking = new Booking({
      email: req.body.email,
      userName: req.body.userName,
      roomNumber: req.body.roomNumber,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      price: req.body.price,
      paymentType: req.body.paymentType,
      tip: req.body.tip,
    });
    try {
      const newBooking = await booking.save();
      res.status(201).json(newBooking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});

// Update a booking by ID
app.put("/bookings/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404).json({ message: "Booking not found" });
  } else {
    const room = await Room.findOne({ roomNumber: req.body.roomNumber });
    const existingBooking = await Booking.find({
      roomNumber: req.body.roomNumber,
      startTime: { $lt: req.body.endTime },
      endTime: { $gt: req.body.startTime },
    });
    console.log(existingBooking);
    if (existingBooking.length > 1) {
      res.status(400).json({ message: "Room is already booked" });
    } else if (!room) {
      res.status(400).json({ message: "Room does not exist" });
    } else {
      try {
        const newBooking = await booking.updateOne({ $set: req.body });
        res.status(201).json(newBooking);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    }
  }
});

// Delete a booking by ID
app.delete("/bookings/:id", async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404).json({ message: "Booking not found" });
  } else {
    try {
      await booking.deleteOne();
      res.json({ message: "Booking deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log("Server started on port " + port);
});