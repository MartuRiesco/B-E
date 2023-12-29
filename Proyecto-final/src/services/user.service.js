import { userRepository } from "../repository/index.js";

export default class UserService {
    static create(data) {
      return userRepository.create(data);
    }
  
    static get(criteria = {}) {
      return userRepository.get(criteria);
    }
  
    static getById(pid) {
      return userRepository.getById(pid);
    }
  
    static updateById(pid, data) {
      return userRepository.updateById({ _id: pid }, { $set: data });
    }
  
    static async deleteById(pid) {
      return userRepository.deleteOne({ _id: pid });
    }
  }