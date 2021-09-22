const faker = require('faker');
const { v4: uuidv4 } = require('uuid');

class Message {
  constructor() {
    this.id = uuidv4();
    this.from = faker.internet.email();
    this.subject = faker.company.bs();
    this.body = faker.lorem.paragraphs();
    this.received = faker.date.recent();
  }
}

module.exports = Message;
