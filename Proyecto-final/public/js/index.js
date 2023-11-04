(function(){
    const socket = io()
        const ul = document.getElementById('ul-websocket')
        const formProduct = document.getElementById('form-product');

formProduct.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;

  socket.emit("addProduct", { title, description, price, code });
});
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
                <p>Id: ${p._id}</p>`
    
                ul.append(html)
            });
        }
    }
    
    socket.on('products', (data) => {
        render(data);
    })

})();
   