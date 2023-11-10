import dbPool from "../utils/db.js";


const getData = () => {
  const query = "SELECT task_id, user_id, title, description, is_done, created_at FROM tasks";
  return dbPool.query(query);
}

const createData = (userId, title, description, isDone) => {
  let createdAt = new Date();
  const query = "INSERT INTO tasks (user_id, title, description, is_done, created_at) VALUES (?,?,?,?,?)";
  const values = [userId, title, description, isDone, createdAt];
  return dbPool.query(query, values);
}

const updateData = (taskId, userId, title, description, isDone) => {
  let updatedAt = new Date();
  const query = "UPDATE tasks SET user_id=?, title=?, description=?, is_done=?, updated_at=? WHERE task_id=?";
  const values = [userId, title, description, isDone, updatedAt, taskId];
  return dbPool.query(query, values);
}

const deleteData = (id) => {
  const query = "DELETE FROM tasks WHERE user_id=?";
  return dbPool.query(query, [id]);
}

export { getData, createData, updateData, deleteData }
