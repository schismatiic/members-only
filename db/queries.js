const pool = require("./pool");

const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.id, messages.title, messages.added, users.username AS user FROM messages INNER JOIN users ON messages.user_fk = users.id",
  );
  return rows;
};

module.exports = { getAllMessages };
