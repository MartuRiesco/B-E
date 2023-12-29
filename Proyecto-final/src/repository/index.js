import User from "./user.repository.js";
import UserDao from "../dao/User.dao.js";

export const userRepository = new User(new UserDao());