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
  },
  {
    username: "jane doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    username: "john doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
