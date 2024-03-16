const purchaseBtn = document.getElementById('btn-to-purchase');

purchaseBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/api/sessions/current');
        if (!response.ok) {
            throw new Error('No se pudo obtener la sesión del usuario');
        }
        const userData = await response.json();
        if (userData.user) {
            const cart = userData.user.cart;
            window.location.href = `/carts/${cart}/purchase`;
        } else {
            console.error('No se recibió información de usuario válida');
        }
    } catch(error) {
        console.error('Error al obtener la sesión del usuario:', error);
    }
});
