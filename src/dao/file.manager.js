import fileDirName from "../utils.js"
import * as fs from 'fs'


const {__dirname} = fileDirName(import.meta)

export class FileManager{
    constructor(path){
        FileManager.id += 0
        this.path = __dirname + '/' + path
    }

    async getAll(){
        try{
            const entidades = await fs.promises.readFile(this.path)
            return JSON.parse(entidades)
        } catch(e) {
            console.log("No había archivo todavía")
            return []
        }
    }

    async getEntityId(id){
        const entities = await this.getAll()
        return entities.find((p) => p.id === id)
    }


    async create(entity){
        const allEntities = await this.getAll()
        if(await this.getEntityId(entity.id)) return console.log(`Product with code ${entity.id} is already added`)

        try{
        if(allEntities.length !== 0) await fs.promises.writeFile(this.path, JSON.stringify([...allEntities, {...entity, id: allEntities[allEntities.length -1].id + 1}], null, 2), 'utf-8')
        else await fs.promises.writeFile(this.path, JSON.stringify([{...entity, id: 1}]), 'utf-8')
        } catch (err) {
            console.log(err)
        }
        return entity
    }

    async updateEntity(id, entity){
        try{
            const allEntities = await this.getAll()
            const updatedEntity = allEntities.map((ent) => ent.id === id ? {...ent, ...entity}: ent)
            
    
            if(!allEntities.find((e) => e.id === id)){ 
            throw new Error(`Product with id ${id} was not found`)
            }else {
                await fs.promises.writeFile(this.path, JSON.stringify(updatedEntity, null, 2))
                return updatedEntity.find((e) => e.id === id)
        }
    
        } catch (err) {
            console.log(`Product with id ${id} was not found`)
        }

    }

    async deleteEntity(id){
        try {
            const allEntities = await this.getAll()
            const entitiesFiltered = allEntities.filter((p) => p.id !== id)
            if(!allEntities.find((e) => e.id === id))
            throw new Error(`Product with id ${id} not found`)
            else await fs.promises.writeFile(this.path, JSON.stringify(entitiesFiltered, null, 2))
        } catch (err) {
            console.log(err)
        }
    }

    async addProductToCart(cid, pid){
        const cart = await this.getEntityId(cid);
        if (!cart) {
            console.log(`El carrito con ID ${cid} no existe`);
            return;
          }
      
        const products = await this.getAll(); 
        const productToAdd = products.find(p => p.id === +pid);
      
        if (!productToAdd) {
          console.log(`El producto con ID ${pid} no existe`);
          return;
        }
      

        const productInCart = cart.products.find(p => p.id === +pid);
        const productInCartString = JSON.stringify(productInCart)
        if (productInCartString) {
          console.log(`El producto ${productInCartString} ya está en el carrito`);
          return cart;
        }
    
    
        const cartsC = await this.getAll()
        cart.products.push({id: productToAdd.id, quantity: 1})
        const index = cartsC.findIndex(c => c.id === +cid)
        cartsC[index] = cart
    
        await this.create(cartsC)
      
        // await this.writeCarts(cart);
      
        console.log(`El producto ${productToAdd.title} ha sido agregado al carrito ${cid}`);
        return cart;
    }


    }


