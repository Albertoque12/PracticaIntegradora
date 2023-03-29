import productsModel from "./models/products.model.js"
import { MongoManager } from "./mongo.manager.js"
import { FileManager } from "./file.manager.js"

class Products {
    #persistencia
    constructor(persistencia){
     this.#persistencia = persistencia   
    }

    async getAll(){
        return this.#persistencia.getAll()
    }

    async save(product){
        return this.#persistencia.create(product)
    }

    async update(pid, product){
        return this.#persistencia.updateEntity(pid, product)
    }

    async delete(id){
        return this.#persistencia.deleteEntity(id)
    }

}

const instancia = new Products(new MongoManager(productsModel))  // Base de datos Mongo
//  const instancia = new Products(new FileManager('../dao/products.json'))  // Base de datos fs

export default instancia