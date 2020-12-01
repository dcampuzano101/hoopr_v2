import moment from "moment";
const runs = [
  {
    name: "Wednesday Night Run",
    location: "The Post",
    date: moment("12-25-2020", "MM-DD-YYYY").format("LL"),
    price: 10,
    capacity: 15,
    users: [],
    waitList: [],
    startTime: moment("08:00", "h:mm a"),
    endTime: moment("10:00", "h:mm a"),
    geoLocation: {
      address: "100 Dobbin St, Brooklyn, NY 11222",
      lat: 40.7251514,
      lng: -73.9566612,
    },
  },
  {
    name: "Saturday Morning Run",
    location: "Cooper Park",
    date: moment("12-25-2020", "MM-DD-YYYY").format("LL"),
    price: 10,
    capacity: 15,
    users: [],
    waitList: [],
    startTime: moment("18:00", "h:mm a"),
    endTime: moment("20:00", "h:mm a"),
    geoLocation: {
      address: "Cooper Park, Brooklyn, NY 11211",
      lat: 40.715946,
      lng: -73.9383233,
    },
  },
  {
    name: "Sunday Morning Run",
    location: "Grand Street Basketball Courts",
    date: moment("12-25-2020", "MM-DD-YYYY").format("LL"),
    price: 10,
    capacity: 15,
    users: [],
    waitList: [],
    startTime: moment("08:00", "h:mm a"),
    endTime: moment("10:00", "h:mm a"),
    geoLocation: {
      address: "Chrystie St &, Forsyth St, New York, NY 10002",
      lat: 40.7217448,
      lng: -73.9937312,
    },
  },
  {
    name: "Wednesday Night Run",
    location: "The Post",
    date: moment("12-25-2020", "MM-DD-YYYY").format("LL"),
    price: 10,
    capacity: 15,
    users: [],
    waitList: [1, 2, 3],
    startTime: moment("18:00", "h:mm a"),
    endTime: moment("20:00", "h:mm a"),
    geoLocation: {
      address: "100 Dobbin St, Brooklyn, NY 11222",
      lat: 40.7251514,
      lng: -73.9566612,
    },
  },
];

export default runs;
