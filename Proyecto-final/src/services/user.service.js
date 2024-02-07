import  {userRepository}  from "../repository/index.js";

export default class UserService {
  static async create(data) {
    console.log('data service', data);
    return await userRepository.create(data);
  }
  
    static get(criteria = {}) {
      return userRepository.get(criteria);
    }
  
    static getById(pid) {
      return userRepository.getById(pid);
    }
  
    static updateById(pid, data) {
      console.log('data', data);
      return userRepository.updateById({ _id: pid },data );
    }
  
    static async deleteById(pid) {
      return userRepository.deleteOne({ _id: pid });
    }
  }