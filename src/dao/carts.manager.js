import cartsModel from "./models/carts.model.js"
import { MongoManager } from "./mongo.manager.js"
import { FileManager } from "./file.manager.js"

class Carts {
    #persistencia
    constructor(persistencia){
     this.#persistencia = persistencia   
    }

    async getAll(){
        return this.#persistencia.getAll()
    }

    async save(cart){
        return this.#persistencia.create(cart)
    }

    async saveProductInCart(cart, pid){
        return this.#persistencia.addProductToCart(cart, pid)
    }

    

    // async update(cid, cart){
    //     return this.#persistencia.updateEntity(cid, cart)
    // }

    // async delete(cid){
    //     return this.#persistencia.deleteEntity(cid)
    // }

}

const instancia = new Carts(new MongoManager(cartsModel)) // Base de datos Mongo
// const instancia = new Carts(new FileManager('../dao/carts.json'))  // Base de datos fs

export default instancia