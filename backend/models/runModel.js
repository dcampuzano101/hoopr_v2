import mongoose from "mongoose";

const runSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    capacity: {
      type: Number,
      required: true,
      default: 15,
    },
    users: {
      type: Array,
      required: true,
      default: [],
    },
    waitList: {
      type: Array,
      required: true,
      default: [],
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    geoLocation: {
      type: Map,
      default: {
        address: "100 Dobbin St, Brooklyn, NY 11222",
        lat: 40.7251474,
        lng: -73.9566612,
      },
    },
  },
  { timestamps: true }
);

const Run = mongoose.model("Run", runSchema);

export default Run;
