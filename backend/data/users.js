import bcrypt from "bcryptjs";

const users = [
  {
    username: "merkyoass",
    email: "dcampuzano101@gmail.com",
    password: bcrypt.hashSync("Zeu$1987", 10),
    isAdmin: true,
  },
  {
    username: "ana furman",
    email: "munya1386@gmail.com",
    password: bcrypt.hashSync("binx1986", 10),
    isAdmin: true,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/ana.jpg",
  },
  {
    username: "Chris Carr",
    email: "chris@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/chris.jpg",
  },
  {
    username: "Danan Capote",
    email: "danan@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/danan.jpg",
  },
  {
    username: "Darko Lukacevic",
    email: "darko@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/darko.jpg",
  },
  {
    username: "Ellis Chang",
    email: "ellis@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/ellis.jpg",
  },
  {
    username: "Jared Schutz",
    email: "jared@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/jared.jpg",
  },
  {
    username: "Jason Caps",
    email: "jason@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/jason.jpg",
  },
  {
    username: "Jon Moreno",
    email: "jon@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/jonathan.jpg",
  },
  {
    username: "Jone Wong",
    email: "jone@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/jone.jpg",
  },
  {
    username: "Kareem Hartl",
    email: "kareem@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/kareem.jpg",
  },
  {
    username: "Danny Kegel",
    email: "danny@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/danny.jpg",
  },
  {
    username: "Kenny L",
    email: "kenny@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/kenny.jpg",
  },
  {
    username: "Lowg Racho",
    email: "lowg@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/lowg.jpg",
  },
  {
    username: "Kevin Mersch",
    email: "kevin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/kevin.jpg",
  },
  {
    username: "Mike Yen",
    email: "mike@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/mike.jpg",
  },
  {
    username: "Radu Negu",
    email: "radu@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/radu.jpg",
  },
  {
    username: "Mike C",
    email: "mikec@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/mikec.jpg",
  },
  {
    username: "Simon Leong",
    email: "simon@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/simon.jpg",
  },
  {
    username: "Steve Song",
    email: "steve@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: false,
    profilePhoto: "https://hoopr2.s3.amazonaws.com/steve.jpg",
  },
];

export default users;
