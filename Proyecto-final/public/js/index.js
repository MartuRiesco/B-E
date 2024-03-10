(function(){
 
    const socket = io()
     const div = document.getElementById('ul-websocket');
        const formProduct = document.getElementById('form-product');
       
        document.addEventListener('click', (event) => {
          if (event.target.classList.contains('addToCart')) {
            const productOwner = event.target.dataset.owner;
        
            if (userRol === 'user' || (userRol === 'premium' && userEmail !== productOwner)) {
              const pid = event.target.dataset.productid;
              addProductToCart(cartId, pid);
              alert('Se agregó al carrito');
            } if(userRol === 'premium' && userEmail === productOwner) {
              alert('No podes agregar productos propios al carrito');
            }if(userRol === 'admin'){
              alert('Solo los usuarios pueden agregar al carrito');
            }
          }
        });
          function addProductToCart(cartId, pid) {
            socket.emit('addProductToCart', cartId.toString(),  pid);
          }
          socket.on('addProductToCart', () => {
          })
         formProduct.addEventListener('submit', (event) => {
          event.preventDefault();
          const title = document.getElementById("title").value;
          const description = document.getElementById("description").value;
          const price = document.getElementById("price").value;
          const code = document.getElementById("code").value;
          const category = document.getElementById("category").value;
          const stock = document.getElementById("stock").value;
          const isPremiumUser = userRol  === 'premium';
          const owner = isPremiumUser ? userEmail : 'admin';

          if (userRol !== 'admin' && userRol !== 'premium') {
            alert('No tiene permisos para crear productos');
            return;
          }else{
            
            alert('producto agregado correctamente')
          }
         
        const product = { title, description, price, code, category, stock}
        const user ={role: userRol, email:userEmail}
    
          socket.emit("addProduct", {product, user} );
          
        });
       
        
/* formProduct.addEventListener('submit', (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;

  socket.emit("addProduct", { title, description, price, code });
}); */
   /*  const render = (data) => {
        div.innerHTML = '';
        //*si la lista de productos esta vacia se imprime un comentario
        if (data.length === 0) {
            div.innerHTML = '<h2 class="h2-home">No hay productos agregados</h2>' 
        } else {
            data.forEach(p => {
                const html = document.createElement('div')
                html.innerHTML =
                ` <div class="card" >
                <img src="" alt="Denim Jeans" style="width:100%">
                <h1>${p.title}</h1>
                <p class="price">${p.price}</p>
                <p class="category">${p.category}</p>
                <p>${p.description}</p>
                <p>Code:</strong>  ${p.code}</p>
                <p><button type="add" >Add to Cart</button></p>
              </div>`
    
                div.append(html)
            });
        }
    }
    
    socket.on('products', (data) => {
        render(data);
    }) */

})();
   