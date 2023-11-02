import messageModel from "../models/message.model.js";
import { Exception } from "../utils.js";

export default class MessageManager{
    static  get(query={}){
        const criteria={}
        return messageModel.find(criteria)
        }
        static  async create( data){
    const message = await messageModel.create(data);
    console.log('Mensaje creado con exito');
    return message
        }}