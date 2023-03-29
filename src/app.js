import express from "express"
import uRouter from "./routes/users.route.js"
import handlebars from 'express-handlebars'
import fileDirName from "./utils.js"
import vRouter from "./routes/views.route.js"
import cRouter from "./routes/courses.route.js"
import mongoose from "mongoose"
import config from '../data.js'
import pRouter from "./routes/products.route.js"
import cartsRouter from "./routes/carts.route.js"
import configureSocket from "./public/socket/configure.socket.js"
import configureHandlebars from "./lib/handlebars/hbs.middleware.js"

const {port, mongo_url} = config

const {__dirname} = fileDirName(import.meta)

const app = express()

//Mongoose

const connection = mongoose.connect( mongo_url ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}   

)


// app.get('/', (req, res)=>{
//     res.send({respuesta:'Corriendo'})  // → fs
// })


//Handlebars
// app.engine('handlebars', handlebars.engine())
// app.set('view engine', 'handlebars')
// app.set('views', __dirname + '/views')

configureHandlebars(app);

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

//Routes
app.use('/', vRouter)
app.use('/api/users', uRouter)
app.use('/api/products', pRouter)
app.use('/api/carts', cartsRouter)

//Manejo de errores // debe ser el último de los middlewares
app.use((error, req, res, next) => {
    if(error.message){
        return res.status(400).send({
            message: error.message
        })
    }
    res.status(500).send({error})
})


const httpServer =  app.listen(port, console.log(`Server running on port ${port}`))

configureSocket(httpServer)
