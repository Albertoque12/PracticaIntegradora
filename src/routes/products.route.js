import { Router } from "express";
import productsManager from "../dao/products.manager.js";

const pRouter = Router()


pRouter.get('/', async (req, res, next)=>{
    try{
        const products = await productsManager.getAll()
        res.send({products})
    } catch (error) {
        next(error)
    }
})

pRouter.get('/:pid', async (req, res, next)=>{

    try{
        const products = await productsManager.getAll()
        const pid = req.params.pid
        const product = products.find(p=> p.id === +pid)
        res.send({product})
    } catch (error) {
        next(error)
    }
})

pRouter.post('/', async (req, res, next) => {
    try{
        const data = req.body
        const newProduct = await productsManager.save(data)
        res.send({product: newProduct})
    } catch (error) {
        next(error)
    }
})

pRouter.put('/:pid', async (req,res, ) => {
    const products = await productsManager.getAll()
    const pid = req.params.pid
    const {title, description, code, price,  stock, thumbnail} = req.body;

    const product = products.find(p=> +p.id === +pid)
    if(!product) return res.send({error: "Product not found"})
    const result = await productsManager.update(+pid, {title, description, code, price,  stock, thumbnail})
    res.status(200).send(result)

})


pRouter.delete("/:pid", (req, res)=> {
    const pid = req.params.pid

    const productToDelete = productsManager.delete(+pid)

    if(productToDelete.err){
        res.status(400).send(err)
    }else{
        res.status(200).send(productToDelete)
    }
})


export default pRouter