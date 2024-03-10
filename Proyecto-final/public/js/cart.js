document.addEventListener('DOMContentLoaded', () => {
    const purchaseButton = document.querySelector('#purchase-button');
  
    if (purchaseButton) {
      purchaseButton.addEventListener('click', async (event) => {
        event.preventDefault();
  
        try {
          // Lógica para realizar la solicitud al servidor y finalizar la compra
          const response = await fetch('/carts/{{cartId}}/purchase', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            // Puedes enviar datos adicionales aquí si es necesario
          });
  
          if (!response.ok) {
            throw new Error('Error al finalizar la compra');
          }
  
          // Parsea la respuesta, asumiendo que contiene información sobre los productos comprados
          const result = await response.json();
  
          const productRows = document.querySelectorAll('.product-row');
        productRows.forEach((row) => {
        // Lógica para identificar los productos que se compraron
        const productId = row.getAttribute('data-product-id');
        const productWasBought = result.products.some(product => product.id === productId);

        if (productWasBought) {
            // Puedes usar row.style.display = 'none'; para ocultar la fila
            // O utiliza row.remove() para eliminar la fila completamente
    row.style.display = 'none';
  }
});
        } catch (error) {
          console.error('Error al finalizar la compra:', error.message);
          // Manejar el error, por ejemplo, mostrar un mensaje al usuario
        }
      });
    }  });

    const emptyButton = document.querySelector('#emptyButton');
    emptyButton.addEventListener('click', async function (event) {
      event.preventDefault();
      const cid = this.getAttribute('data-cid');
      console.log(cid, 'dic');
      try {
        const response = await fetch(`/carts/${cid}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          location.reload();
          console.log('Cart emptied successfully');
        } else {
          console.error('Failed to empty cart:', response.statusText);
        }
      } catch (error) {
        console.error('Error emptying cart:', error);
      }
    });
  

    const deleteButtons = document.querySelectorAll('.deleteButton');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', async function (event) {
        event.preventDefault();
        const cid = this.getAttribute('data-cid');
        const pid = this.getAttribute('data-pid');
        try {
          const response = await fetch(`/carts/${cid}/product/${pid}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            this.closest('div').remove();
            window.location.href = `/carts/${cid}`;
          } else {
            console.error('Failed to delete product:', response.statusText);
          }
        } catch (error) {
          console.error('Error deleting product:', error);
        }
      });
    });