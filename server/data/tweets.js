import * as userRepository from "../data/auth.js";
import { db } from "../db/database.js";

// let tweets = [
//   {
//     id: "1",
//     text: "hello",
//     createdAt: new Date().toString(),
//     userId: "1",
//     // name: "Ellie",
//     // username: "ellie",
//     // url: "",
//   },
//   {
//     id: "2",
//     text: "good bye",
//     createdAt: new Date().toString(),
//     userId: "1",
//     // name: "Dongja",
//     // username: "dongja",
//     // url: "",
//   },
// ];

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url\
    FROM tweets as tw JOIN users as us\
    ON tw.userId=us.id";

const ORDER_DESC = "ORDER BY createdAt DESC";

// get all tweets
export async function getAll() {
  // return Promise.all(
  //   tweets.map(async (tweet) => {
  //     const {
  //       id,
  //       name,
  //       username,
  //       password,
  //       email,
  //       url,
  //     } = await userRepository.findById(tweet.userId);
  //     return { ...tweet, name, username, url };
  //   })
  // );
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => {
    return result[0];
  });
}

// get tweets by username
export async function getAllByUsername(username) {
  // return getAll().then((tweets) =>
  //   tweets.filter((tweet) => tweet.username == username)
  // );
  return db
    .execute(`${SELECT_JOIN} WHERE username=? ${ORDER_DESC}`, [username])
    .then((result) => {
      return result[0];
    });
}

// get tweet by id
export async function getById(id) {
  // const found = tweets.find((tweet) => tweet.id === id);
  // if (!found) {
  //   return null;
  // }
  // const {
  //   _,
  //   name,
  //   username,
  //   password,
  //   email,
  //   url,
  // } = await userRepository.findById(found.userId);
  // return { ...found, name, username, url };
  return db.execute(`${SELECT_JOIN} WHERE tw.id=?`, [id]).then((result) => {
    return result[0][0];
  });
}

// post tweet
export async function create(text, userId) {
  // const tweet = {
  //   id: Date.now().toString(),
  //   text,
  //   createdAt: new Date().toString(),
  //   userId,
  // };

  // tweets = [tweet, ...tweets];
  // return getById(tweet.id);
  return db
    .execute("INSERT INTO tweets (text, userId, createdAt) VALUES (?, ?, ?)", [
      text,
      userId,
      new Date(),
    ])
    .then((result) => {
      return getById(result[0]["insertId"]);
    });
}

//  PUT tweet by id
export async function update(id, text) {
  // const tweet = tweets.find((tweet) => tweet.id === id);
  // if (tweet) {
  //   tweet.text = text;
  // }
  // return getById(tweet.id);
  return db
    .execute("UPDATE tweets SET text=? WHERE id=?", [text, id])
    .then(() => {
      return getById(id);
    });
}

export async function remove(id) {
  // tweets = tweets.filter((tweet) => tweet.id !== id);
  return db.execute("DELETE FROM tweets WHERE id=?", [id]);
}
