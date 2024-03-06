async function deleteUser(userId) {
    try {
        const response = await fetch(`/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Ajusta 'token' según corresponda
            }
        });
        if (response.ok) {
            // Usuario eliminado correctamente, actualizar la vista o realizar otras acciones
            location.reload(); // Recargar la página
        } else {
            // Mostrar mensaje de error o manejar la situación de otra manera
        }
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        // Mostrar mensaje de error o manejar la situación de otra manera
    }
}
   