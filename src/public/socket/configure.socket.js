import { Server } from "socket.io";

export default function configureSocket(httpServer){
    const io = new Server(httpServer)
    io.on('connection', (socket) => {
        console.log('new connection', socket.id)
    })
}