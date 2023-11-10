import { getData, createData, updateData, deleteData, getDataByEmail } from "../repositories/users.js";
import { responseError, responseSuccess } from "../utils/response.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const ACCESS_TOKEN_SECRET = "kelas.com";
const REFRESH_TOKEN_SECRET = "backend";

export const getUsers = async (request, response, next) => {
  try {
    const [result] = await getData();
  
    if (result.length != 0) {
      responseSuccess(response, "success", result);
    } else {
      responseError(response, "Error", 404);
    }
  } catch(error) {
      next(error);
  }
}

export const createUser = async (request, response, next) => {
  try {
    let name = request.body.name;
    let email = request.body.email;
    let password = request.body.password;
    let saltRound = 10;
    bcrypt.hash(password, saltRound, async (errror, hashedPass) => {
      const [result] = await createData(name, email, hashedPass);
      if (result.insertId > 0) {
        responseSuccess(response, "Success", result.insertId);
      } else {
        responseError(response, "Failed to create", 500);
      }
    })
  } catch(error) {
    next(error);
  }
}

export const updateUser = async (request, response, next) => {
  try {
    let id = request.params.id;
    let name = request.body.name;
    let email = request.body.email;
    let updatedBy = request.claims.id;
    console.log(request.claims);
    const [result] = await updateData(id, name, email, updatedBy);
  
    if (result.affectedRows > 0) {
      responseSuccess(response, "Success update data", result);
    } else {
      responseError(response, "Error update data", 400)
    }
  } catch(error) {
    next(error);
  }
}

export const deleteUser = async (request, response, next) => {
  try {
    let id = request.params.id;
    const [result] = await deleteData(id);
  
    if (result.affectedRows > 0) {
      responseSuccess(response, "Success delete data", result);
    } else {
      responseError(response, "Failed delete data");
    }
  } catch(error) {
    next(error);
  }
}

export const login = async (request, response, next) => {
  try {
    let user;
    let email = request.body.email;
    let password = request.body.password;
    
    const [result] = await getDataByEmail(email);
    if (result.length > 0) {
      user = result[0];
      bcrypt.compare(password, user.password, (error, isValid) => {
        if (isValid) {
          let payload = {
            id: user.user_id,
            name: user.name,
            email: user.email
          }
          let accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
          let refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: "30m"});
          let data = {
            access_token: accessToken,
            refresh_toke: refreshToken,
          }
          responseSuccess(response, "success", data);
        } else {
          responseError(response, "email atau password salah");
        }
      })
    } else {
      responseError(response, "email atau password salah");
    }
  } catch(error) {
    next(error);
  }
}

export const tokenValidation = (request, response, next) => {
  try {
    let authToken = request.headers.authorization;
    let accessToken = authToken && authToken.split(' ')[1];

    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (error, payload) => {
      if (!error) {
        request.claims = payload;
        next();
      } else {
        responseError(response, error.message, 403);
      }
    })
  } catch(error) {
    next(error);
  }
}