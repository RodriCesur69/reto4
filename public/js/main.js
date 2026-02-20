document.addEventListener('DOMContentLoaded', () => {
    const btnFiltro = document.getElementById('btnFiltroFavoritos');
    let soloFavoritos = false; 

    function obtenerFavs() {
        try {
            return JSON.parse(localStorage.getItem('favs_rodri')) || [];
        } catch (e) {
            return [];
        }
    }

    function actualizarInterfaz() {
        const favs = obtenerFavs();
        const tarjetas = document.querySelectorAll('.tarjeta-juego');

        tarjetas.forEach(t => {
            const id = String(t.dataset.id);
            const icono = t.querySelector('.btn-favorito i');
            
            if (icono) {
                if (favs.includes(id)) {
                    icono.classList.remove('bi-star');
                    icono.classList.add('bi-star-fill');
                    t.style.display = 'block';
                } else {
                    icono.classList.remove('bi-star-fill');
                    icono.classList.add('bi-star');
                    t.style.display = soloFavoritos ? 'none' : 'block';
                }
            }
        });

        if (btnFiltro) {
            btnFiltro.innerHTML = soloFavoritos ? 
                '<i class="bi bi-star-fill"></i> Ver Todos' : 
                '<i class="bi bi-star"></i> Ver Favoritos';
        }
    }

    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-favorito');
        if (btn) {
            e.preventDefault();
            let favs = obtenerFavs();
            const id = String(btn.dataset.id);

            if (favs.includes(id)) {
                favs = favs.filter(f => f !== id);
            } else {
                favs.push(id);
            }
            
            localStorage.setItem('favs_rodri', JSON.stringify(favs));
            actualizarInterfaz();
        }
    });

    if (btnFiltro) {
        btnFiltro.addEventListener('click', (e) => {
            e.preventDefault();
            soloFavoritos = !soloFavoritos;
            actualizarInterfaz();
        });
    }

    const manejarFormulario = async (e) => {
        const form = e.target;
        if (form.id === 'formInsertar' || form.id === 'formEditar') {
            e.preventDefault(); 
            const formData = new FormData(form);
            const datos = Object.fromEntries(formData.entries());

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });
                const data = await res.json();
                if (data.success) {
                    window.location.href = '/coleccion';
                }
            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    document.addEventListener('submit', manejarFormulario);
    actualizarInterfaz();
});