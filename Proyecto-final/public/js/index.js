(function(){
    const socket = io()
        const ul = document.getElementById('ul-websocket')
       /*  Swal.fire({
            title: "Enter product details",
            html:
              `<input required id="title" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Title">` +
              `<input required id="description" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Description">` +
              `<input required id="price" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Price">` +
              `<input required id="code" class="swal2-input placeholder-gray-900 border-gray-900" placeholder="Code">` ,
              
            showCancelButton: true,
            confirmButtonText: "Add",
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              const title = document.getElementById("title").value;
              const description = document.getElementById("description").value;
              const price = document.getElementById("price").value;
              const code = document.getElementById("code").value;
        
              socket.emit("addProduct", {
                title,
                description,
                price,
                code,              
              });
            }
          }); */
        
    const render = (data) => {
        ul.innerHTML = ''
        //*si la lista de productos esta vacia se imprime un comentario
        if (data.length === 0) {
            ul.innerHTML = '<h2 class="h2-home">No hay productos agregados</h2>'
        } else {
            data.forEach(p => {
                const html = document.createElement('li')
                html.innerHTML =
                `<p>Title: ${p.title}</p>
                <p>Description: ${p.description}</p>
                <p>Price: $${p.price}</p>
                <p>Status: ${p.status}</p>
                <p>Code: ${p.code}</p>
                <p>Id: ${p.id}</p>`
    
                ul.append(html)
            });
        }
    }
    
    socket.on('products', (data) => {
        render(data);
    })

})();
   