import { isPasswordValid } from "../utils.js";
import UserDTO from "../dto/user.dto.js";


export default class User {
    constructor(dao) {
        this.dao = dao;
    }
    
    async get(email) {
        const user = new UserDTO(await this.dao.get(email));

        return user
        /* return new UserDTO(await this.dao.get(email)); */
        
    }
    
    async getById(id) {
    return new UserDTO(await this.dao.getById(id));}
    
    async find(criteria) {
    return new UserDTO(await this.dao.find(criteria));}
    
    async  create(user) {

    return new UserDTO(await this.dao.create(user) ) ;}
    
    async updateById(id, data) {
        const updateResult = await this.dao.updateById(id, { $set: data });
        return updateResult;  // Devuelve directamente el resultado de la actualización
      }
      
    
    deleteById(id) {
    return this.dao.deleteById(id);}
    
    async passwordCheck(email, password) {
    const user = await this.dao.get(email);
    console.log('user pass', user);
    return isPasswordValid(password, user.password);}
}