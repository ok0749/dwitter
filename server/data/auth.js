// import bcrypt from "bcrypt";
// const password = await bcrypt.hash("12345", 12);

import { db } from "../db/database.js";

// let users = [
//   {
//     id: "1",
//     name: "Ellie",
//     username: "ellie",
//     password: password,
//     email: "ellie@gmail.com",
//     url: "",
//   },
//   {
//     id: "2",
//     name: "Dongja",
//     username: "dongja",
//     password: password,
//     email: "dongja@gmail.com",
//     url: "",
//   },
// ];

export async function findByUsername(username) {
  // return users.find((user) => user.username === username);
  return db
    .execute("SELECT * FROM users WHERE username=?", [username])
    .then((result) => {
      return result[0][0];
    });
}

export async function createUser(user) {
  // const created = { ...user, id: Date.now().toString() };
  // users.push(created);
  // return created.id;
  const { username, password, name, email, url } = user;
  return db
    .execute(
      "INSERT INTO users(username, password, name, email, url) VALUES (?, ?, ?, ?, ?)",
      [username, password, name, email, url]
    )
    .then((result) => {
      return result[0]["insertId"];
    });
}

export async function findById(id) {
  // return users.find((user) => user.id === id);
  return db.execute("SELECT * FROM users WHERE id=?", [id]).then((result) => {
    return result[0][0];
  });
}
