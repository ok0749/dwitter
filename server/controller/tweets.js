import * as tweetsRepository from "../data/tweets.js";
import { getSocketIO } from "../connection/socket.js";

export async function getTweets(req, res, next) {
  const username = req.query.username;
  const data = username
    ? await tweetsRepository.getAllByUsername(username)
    : await tweetsRepository.getAll();
  res.status(200).json(data);
}

export async function getById(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetsRepository.getById(id);
  if (tweet) {
    return res.status(200).json(tweet);
  }
  res.status(404).json({ message: `Invalid tweet id(${id})` });
}

export async function create(req, res, next) {
  const { text } = req.body;
  const userId = req.userId;
  const tweet = await tweetsRepository.create(text, userId);
  res.status(201).json(tweet);
  getSocketIO().emit("tweets", tweet);
}

export async function update(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetsRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await tweetsRepository.update(id, text);
  res.status(200).json(updated);
}

export async function remove(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetsRepository.getById(id);
  if (!tweet) {
    return res.sendStatus(404);
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await tweetsRepository.remove(id);
  res.sendStatus(204);
}
