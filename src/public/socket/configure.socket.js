import { Server } from "socket.io";
import messagesModel from "../../dao/models/chat.model.js";
const messages = []


export default function configureSocket(httpServer){
    const io = new Server(httpServer)
    io.on('connection', (socket) => {
        console.log('new connection', socket.id)

        //El servidor escucha con el ID message
        socket.on('message', data=>{
            console.log('message:', (data))
            const message = new messagesModel({ user: data.user, message: data.message });
            message.save()
                .then(savedMessage => {
                    messages.push(savedMessage);
                    console.log('mensajes:', { messages });
                    io.emit('messageLogs', messages);
                })
                .catch(error => console.log(error));
        });

        socket.on('new-user',(data)=> {
            console.log('new user:', data)
            socket.emit('messageLogs', messages)
            socket.broadcast.emit('user_connected', data );
        });
    });
}