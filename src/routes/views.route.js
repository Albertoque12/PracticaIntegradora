import { Router } from "express";
import usersManager from '../dao/users.manager.js'
import productsManager from '../dao/products.manager.js'
import cartsManager from '../dao/carts.manager.js'

const vRouter = Router()

vRouter.get('/', async (req, res) => {
    const users = await usersManager.getAll()
    res.render('users', {
        title: 'Users',
        users
    })
})

vRouter.get('/products', async (req, res) => {
    const products = await productsManager.getAll()
    res.render('products', {
        title: 'Products',
        products
    })
})

vRouter.get('/carts', async (req, res) => {
    const products = await cartsManager.getAll()
    res.render('carts', {
        title: 'Carts',
        products
    })
})

vRouter.get('/messages', async (req, res) => {
    res.render('chat', {})
})


export default vRouter