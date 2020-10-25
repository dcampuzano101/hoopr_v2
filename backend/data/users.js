import bcrypt from "bcryptjs";

const users = [
  {
    name: "David Campuzano",
    email: "dcampuzano101@gmail.com",
    password: bcrypt.hashSync("Zeu$1987", 10),
    isAdmin: true,
  },
  {
    name: "Ana Furman",
    email: "munya1386@gmail.com",
    password: bcrypt.hashSync("binx1986", 10),
    isAdmin: true,
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
