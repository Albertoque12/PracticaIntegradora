import usersModel from './models/user.model.js';
import { MongoManager } from './mongo.manager.js';

class Users {
  #persistencia;
  constructor(persistencia) {
    this.#persistencia = persistencia;
  }

  async getAll() {
    return this.#persistencia.getAll();
  }

  async save(user) {
    return this.#persistencia.create(user);
  }
}

const instancia = new Users(new MongoManager(usersModel))

export default instancia