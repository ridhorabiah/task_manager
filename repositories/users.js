import dbPool from "../utils/db.js";


const getData = () => {
  const query = "SELECT user_id, name, email, password, created_at FROM users";
  return dbPool.query(query);
}

const createData = (name, email, password) => {
  let createdAt = new Date();
  const query = "INSERT INTO users (name, email, password, created_at) VALUES(?, ?, ?, ?)";
  const values = [name, email, password, createdAt];
  return dbPool.query(query, values);
}

const updateData = (id, name, email) => {
  let updatedAt = new Date();
  const query = "UPDATE users SET name=?, email=?, updated_at=? WHERE user_id=?";
  const values = [name, email, updatedAt, id];
  return dbPool.query(query, values);
}

const deleteData = (id) => {
  const query = "DELETE FROM users WHERE user_id=?";
  return dbPool.query(query, [id]);
}

export { getData, createData, updateData, deleteData }
