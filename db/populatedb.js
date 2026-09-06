const { Client } = require("pg");
process.loadEnvFile();

const SQL = `
CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership_status BOOLEAN DEFAULT FALSE,
    admin_status BOOLEAN DEFAULT FALSE
);
CREATE TABLE IF NOT EXISTS messages(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    added TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    user_fk INTEGER NOT NULL,
   FOREIGN KEY (user_fk) REFERENCES users(id) 
);
INSERT INTO users (
    first_name,
    last_name,
    username,
    email,
    password,
    membership_status,
    admin_status
) VALUES
('James', 'Carter', 'jcarter', 'james@example.com', 'test', true, true),
('Emily', 'Walker', 'emilyw', 'emily@example.com', 'test', true, false),
('Daniel', 'Morgan', 'danm', 'daniel@example.com', 'test', false, false);

INSERT INTO messages (
    title,
    message,
    user_fk
) VALUES
('dfkjdshf', 'dfkjdshfjldhajladhfadskajSDKL', 1),
('asdjkl', 'QWERTYuiopasdfghJKLzxcvbnm', 2),
('zxcmnb', 'lkjHGFDSAqwertyuiopZXCV', 3),
('random', 'jdhfksjdhfKJHDSKJHFqweoiu', 1),
('test', 'ASDKJHaskdjhASKDJH123lkjhg', 2),
('something', 'POIUYTREWQLKJHGFDSAMNBVCXZ', 3);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
