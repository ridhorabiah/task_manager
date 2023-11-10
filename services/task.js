import { getData, createData, updateData, deleteData } from "../repositories/tasks.js";
import { responseSuccess, responseError } from "../utils/response.js";


export const getTasks = async (request, response, next) => {
  try {
    const [result] = await getData();
  
    if (result.length != 0) {
      responseSuccess(response, "Success get tasks", result);
    } else {
      responseError(response, "Error", 404);
    }
  } catch(error) {
    next(error);
  }

}

export const createdTask = async (request, response, next) => {
  try {
    let userId = request.body.user_id;
    let title = request.body.title;
    let description = request.body.description;
    let isDone = request.body.is_done;
    const [result] = await createData(userId, title, description, isDone);
  
    if (result.insertId > 0) {
      responseSuccess(response, "Success", result.insertId);
    } else {
      responseError(response, "Failed to create task", 500);
    }
  } catch(error) {
    next(error);
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
