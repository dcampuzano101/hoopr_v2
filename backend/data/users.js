import bcrypt from "bcryptjs";

const users = [
  {
    username: "merkyoass",
    email: "dcampuzano101@gmail.com",
    password: bcrypt.hashSync("Zeu$1987", 10),
    waitList: [],
    isAdmin: true,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/fallback.jpg",
    orders: {},
  },
  {
    username: "ana furman",
    email: "munya1386@gmail.com",
    password: bcrypt.hashSync("binx1986", 10),
    waitList: [],
    isAdmin: true,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/ana.jpg",
    orders: {},
  },
  {
    username: "Chris Carr",
    email: "chris@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/chris.jpg",
    orders: {},
  },
  {
    username: "Danan Capote",
    email: "danan@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/danan.jpg",
    orders: {},
  },
  {
    username: "Darko Lukacevic",
    email: "darko@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/darko.jpg",
    orders: {},
  },
  {
    username: "Ellis Chang",
    email: "ellis@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/ellis.jpg",
    orders: {},
  },
  {
    username: "Jared Schutz",
    email: "jared@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/jared.jpg",
    orders: {},
  },
  {
    username: "Jason Caps",
    email: "jason@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/jason.jpg",
    orders: {},
  },
  {
    username: "Jon Moreno",
    email: "jon@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/jonathan.jpg",
    orders: {},
  },
  {
    username: "Jone Wong",
    email: "jone@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/jone.jpg",
    orders: {},
  },
  {
    username: "Kareem Hartl",
    email: "kareem@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/kareem.jpg",
    orders: {},
  },
  {
    username: "Danny Kegel",
    email: "danny@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/danny.jpg",
    orders: {},
  },
  {
    username: "Kenny L",
    email: "kenny@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/kenny.jpg",
    orders: {},
  },
  {
    username: "Lowg Racho",
    email: "lowg@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/lowg.jpg",
    orders: {},
  },
  {
    username: "Kevin Mersch",
    email: "kevin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/kevin.jpg",
    orders: {},
  },
  {
    username: "Mike Yen",
    email: "mike@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/mike.jpg",
    orders: {},
  },
  {
    username: "Radu Negu",
    email: "radu@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/radu.jpg",
    orders: {},
  },
  {
    username: "Mike C",
    email: "mikec@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/mikec.jpg",
    orders: {},
  },
  {
    username: "Simon Leong",
    email: "simon@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/simon.jpg",
    orders: {},
  },
  {
    username: "Steve Song",
    email: "steve@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    waitList: [],
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/steve.jpg",
    orders: {},
  },
];

export default users;
