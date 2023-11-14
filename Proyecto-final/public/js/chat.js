(function(){
    const  socket= io();
    let userName
    const formMessage = document.getElementById('form-message');
    const inputMessage = document.getElementById('input-message');
    const logMessages = document.getElementById('log-messages');

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = inputMessage.value;
        socket.emit('new-message', { userName, message });
        console.log('Nuevo mensaje enviado', { userName, message });
        inputMessage.value = '';
        inputMessage.focus();
      });
 function updateMessages(messages){
    logMessages.innerText = '';
    console.log('mensajes',messages);
   
    messages.forEach((msg)  => {
        const p = document.createElement('p');
        p.innerText = `${msg.userName}: ${msg.message}`;
        logMessages.appendChild(p);
    });
}


socket.on('notification', ({ messages }) => {
    updateMessages(messages);
  });

  socket.on('new-message-from-api', (message) => {
    console.log('new-message-from-api ->', message);
  });

  socket.on('new-client', () => {
    Swal.fire({
      text: 'Nuevo usuario conectado 🤩',
      toast: true,
      position: "top-right",
    });
  });

  Swal.fire({
    title:'Identificación',
    input:'text',
    inputLabel:'Ingrese su mail',
    allowOutsideClick: false,
    inputValidator: (value)=>{
        if(!value){
            return 'Ingrese en mail para continuar'
        }
    }
  })
  .then((result)=>{
  userName = result.value.trim()
    console.log(`Bienvenid@ ${userName}`);
  });




})();