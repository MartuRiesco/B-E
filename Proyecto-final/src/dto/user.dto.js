export default class UserDTO {
    constructor(user) {
    this.id = user.id || user._id;
    this.first_name = user.first_name
    this.last_name = user.last_name;
    this.email = user.email;
    this.password = user.password;
    this.age = user.age;
    this.role = user.role;
    this.cart = user.cart;}}