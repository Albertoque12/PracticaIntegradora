const socket = io();
let user
let chatBox = document.getElementById('chatBox')


Swal.fire(
  {title:'Identifícate',
   text:'Ingresa tu ususario, por favor',
   input:'text',
   icon:'question',
   inputValidator: (value) => {
    return !value && '¡Por favor, ingresa tu usuario para continuar!'
   },
   allowOutsideClick:false
  }).then(result => {
    user = result.value
    console.log({user})
    socket.emit('new-user', {user})
  })

      //Aquí se va a recibir la info del id messageLogs
      socket.on('messageLogs', (data) => {
        const log = document.querySelector('#messageLogs')
        const messages = data
        .map((mes) => `<p>${mes.user} dice: ${mes.message}</p>`)
        .join('')
        log.innerHTML = messages
    })

    socket.on('user_connected', (data) => {
        Swal.fire({
            title: 'Nuevo usuario conectado',
            text: `${data.user} se acaba de conectar`,
            toast: true,
            position: 'top-right'
        })
    })
    

  chatBox.addEventListener('keyup', event=>{
    if(event.key === "Enter"){
      if(chatBox.value.trim().length>0){
        socket.emit("message", {user:user, message: chatBox.value })
        chatBox.value=""
      }
    }
  })