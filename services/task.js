import { getData, createData, updateData, deleteData } from "../repositories/tasks.js";


export const getTasks = async () => {
  const [result] = await getData();

  if (result.length != 0) {
    console.log(result);
  } else {
    console.log("Tak ada satu pun record.");
  }
}

export const createdTask = async (userId, title, description, isDone) => {
  const [result] = await createData(userId, title, description, isDone);

  if (result.insertId > 0) {
    console.log(`Horey! Entri dengan id:${result.insertId} berhasil disimpan sebagai record.`)
  }
}

export const updateTask = async (taskId, userId, title, description, isDone) => {
  const [result] = await updateData(taskId, userId, title, description, isDone);

  if (result.affectedRows > 0) {
    console.log("Update data berhasil.");
  } else {
    console.log("Terjadi kesalahan.");
  }
}

export const deleteTask = async (taskId) => {
  const [result] = await deleteData(taskId);

  if (result.affectedRows > 0) {
    console.log("Task berhasil di delete.");
  } else {
    console.log("Data task tidak ditemukan!");
  }
}
