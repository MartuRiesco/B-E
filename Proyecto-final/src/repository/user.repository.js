import { isPasswordValid } from "../utils.js";
import UserDTO from "../dto/user.dto.js";

export default class User {
    constructor(dao) {
        this.dao = dao;
        console.log('dao', this.dao);
        console.log('typeof dao.get:', typeof this.dao.get);
    }
    
    async get(email) {
        console.log('typeof this.dao.get (inside get method):', typeof this.dao.get);
        const user = new UserDTO(await this.dao.get(email));
        console.log('pass', user.password);

        return user
        /* return new UserDTO(await this.dao.get(email)); */
        
    }
    
    async getById(id) {
    return new UserDTO(await this.dao.getById(id));}
    
    async find(criteria) {
    return new UserDTO(await this.dao.find(criteria));}
    
    async create(user) {
    return new UserDTO(await this.dao.create(user));}
    
    updateById(id, userUpdated) {
    return this.dao.updateById(id, userUpdated);}
    
    deleteById(id) {
    return this.dao.deleteById(id);}
    
    async passwordCheck(email, password) {
    const user = await this.dao.get(email);
    console.log('user pass', user);
    return isPasswordValid(password, user.password);}
}