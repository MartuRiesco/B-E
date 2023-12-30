import TicketModel from '../models/ticket.model.js';

class TicketController {
  static async createTicket(ticketData) {
    return TicketModel.create(ticketData);
  }
}

export default TicketController;