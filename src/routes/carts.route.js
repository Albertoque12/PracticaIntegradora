import { Router } from "express";
import cartsManager from "../dao/carts.manager.js";

const cartsRouter = Router()


cartsRouter.get('/', async (req, res, next)=>{
    try{
        const carts = await cartsManager.getAll()
        res.send({carts})
    } catch (error) {
        next(error)
    }
})

cartsRouter.get('/:cid', async (req, res, next)=>{

    try{
        const carts = await cartsManager.getAll()
        const cid = req.params.cid
        const cart = carts.find(p=> p.id === +cid)
        res.send({cart})
    } catch (error) {
        next(error)
    }
})



cartsRouter.post('/', async (req, res, next) => {
    try{
        const data = req.body
        const newCart = await cartsManager.save(data)
        res.send({cart: newCart})
    } catch (error) {
        next(error)
    }
})


cartsRouter.post('/:cid/products/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    
    const prodToAdd = await cartsManager.saveProductInCart(+cid, +pid)
   res.json(prodToAdd)
  });





export default cartsRouter