(function(){
    const  socket= io();
    const formMessage = document.getElementById('form-message');
    const inputMessage = document.getElementById('input-message');
    const logMessages = document.getElementById('log-messages');

    formMessage.addEventListener('submit', (event) => {
        event.preventDefault();
        const message = inputMessage.value;
        if (userRol !== 'user') {
          alert('Solo los usuarios pueden escribir mensajes');
          return;
      }
        socket.emit('new-message', { userName, message });
        inputMessage.value = '';
        inputMessage.focus();
      });
 function updateMessages(messages){
    logMessages.innerText = '';
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
    inputLabel:'Ingrese su nombre de usuario',
    allowOutsideClick: false,
    inputValidator: (value)=>{
        if(!value){
            return 'Ingrese en mail para continuar'
        }
    }
  })
  .then((result)=>{ 
  userName = result.value.trim()
  
  });




})();