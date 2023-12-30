import UserModel from "../models/user.model.js";

export default class UserDao {
     create(data) {
      console.log('data dao', data);
      return UserModel.create(data);
    }
  
     get(criteria = {}) {
      return UserModel.findOne(criteria);
    }
  
     getById(pid) {
      return UserModel.findById(pid);
    }
  
     updateById(pid, data) {
      return UserModel.updateOne({ _id: pid }, { $set: data });
    }
  
     async deleteById(pid) {
      return UserModel.deleteOne({ _id: pid });
    }
  }