import UserDao from "../dao/User.dao.js";

export default class UserService {
    static create(data) {
      return UserDao.create(data);
    }
  
    static get(criteria = {}) {
      return UserDao.get(criteria);
    }
  
    static getById(pid) {
      return UserDao.getById(pid);
    }
  
    static updateById(pid, data) {
      return UserDao.updateById({ _id: pid }, { $set: data });
    }
  
    static async deleteById(pid) {
      return UserDao.deleteOne({ _id: pid });
    }
  }