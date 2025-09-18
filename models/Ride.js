// models/Ride.js
import mongoose from "mongoose";

const RideSchema = new mongoose.Schema({
  pickup: { type: String, required: true },
  drop: { type: String, required: true },
  status: { type: String, enum: ["requested", "accepted", "in-progress", "completed"], default: "requested" },
  riderId: { type: String }, 
  driverId: { type: String }, 
}, { timestamps: true });

export default mongoose.models.Ride || mongoose.model("Ride", RideSchema);
