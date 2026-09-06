const pool = require("./pool");

const createSignUp = async (firstName, lastName, username, email, password) => {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)",
    [firstName, lastName, username, email, password],
  );
};
const createMessage = async (title, message, user_fk) => {
  await pool.query(
    "INSERT INTO messages (title, message, user_fk) VALUES ($1, $2, $3);",
    [title, message, user_fk],
  );
};
const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.id, messages.title, messages.message, messages.added, users.username AS user FROM messages INNER JOIN users ON messages.user_fk = users.id",
  );
  return rows;
};
const getUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
};
const getUserById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};
const getEmail = async (email) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
};
const getIdentifier = async (identifier) => {
  const { rows } = await pool.query(
    "SELECT * FROM users WHERE username = $1 OR email = $1",
    [identifier],
  );
  return rows[0];
};
const updateMembership = async (id) => {
  await pool.query("UPDATE users SET membership_status = true WHERE id = $1", [
    id,
  ]);
};
const updateAdmin = async (id) => {
  await pool.query("UPDATE users SET admin_status = true WHERE id = $1", [id]);
};
module.exports = {
  getAllMessages,
  createSignUp,
  createMessage,
  getUsername,
  getUserById,
  getEmail,
  getIdentifier,
  updateMembership,
  updateAdmin,
};
