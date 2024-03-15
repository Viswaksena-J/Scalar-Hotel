const mongoose = require("mongoose");

// Define the schema
const bookingSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true },
    roomNumber: { type: String, required: true, trim: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
    versionKey: false, 
  }
);

// Add a pre-save hook to validate the booking duration
bookingSchema.pre("save", function (next) {
  if (this.startTime >= this.endTime) {
    return next(new Error("Start time must be before end time."));
  }
  next();
});

// Create the model
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;