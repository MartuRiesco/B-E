(
    function(){
        const socket = io()
        const div = document.getElementById('ul-websocket')
        const formProduct = document.getElementById('form-product');

        formProduct.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = document.getElementById("title").value;
            const description = document.getElementById("description").value;
            const price = document.getElementById("price").value;
            const code = document.getElementById("code").value;
            const category = document.getElementById("category").value;
            alert('producto agregado correctamente')
          
            socket.emit("addProduct", { title, description, price, code, category });
            
          });
    
    const render = (data) => {
        div.innerHTML = '';
        //*si la lista de productos esta vacia se imprime un comentario
        if (data.length === 0) {
            div.innerHTML = '<h2 class="h2-home">No hay productos agregados</h2>' 
        } /* else {
            data.forEach(p => {
                const html = document.createElement('li')
                html.innerHTML =
                ` <div class="card">
                <img src="" alt="Denim Jeans" style="width:100%">
                <h1>${p.title}</h1>
                <p class="price">${p.price}</p>
                <p>${p.description}</p>
                <p>Code:</strong>  ${p.code}</p>
                <p><button>Add to Cart</button></p>
              </div>`
    
                div.append(html)
            });
        } */
    }
    
    socket.on('products', (data) => {
        render(data);
    })}
)();