const pool = require("./pool");

const createSignUp = async (firstName, lastName, username, email, password) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, email, password],
  );
};
const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.id, messages.title, messages.added, users.username AS user FROM messages INNER JOIN users ON messages.user_fk = users.id",
  );
  return rows;
};
const getUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
};
const getEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};

module.exports = { getAllMessages, createSignUp, getUsername, getEmail };
