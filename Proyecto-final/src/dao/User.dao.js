import UserModel from "../models/user.model.js";

export default class UserDao {
    static create(data) {
      return UserModel.create(data);
    }
  
    static get(criteria = {}) {
      return UserModel.findOne(criteria);
    }
  
    static getById(pid) {
      return UserModel.findById(pid);
    }
  
    static updateById(pid, data) {
      return UserModel.updateOne({ _id: pid }, { $set: data });
    }
  
    static async deleteById(pid) {
      return UserModel.deleteOne({ _id: pid });
    }
  }