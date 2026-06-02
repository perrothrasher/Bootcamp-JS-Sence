const botonArriba = document.getElementById('btn-arriba');

window.addEventListener('scroll', () =>{
    // Altura total de la pagina
    const alturaPaginaWeb = document.documentElement.scrollHeight;
    //console.log("altura pagina web: ", alturaPaginaWeb);
    // Altura visible desde el navegador
    const alturaVentanaVisible = window.innerHeight;
    // Posicion actual del scroll
    const posicionScroll = window.scrollY;
    //console.log("Pixeles desplazados: ", posicionScroll);

    if((posicionScroll + alturaVentanaVisible) >= (alturaPaginaWeb -50)){
        botonArriba.style.setProperty('display', 'block', 'important');
    }else{
        botonArriba.style.setProperty('display', 'none', 'important');
    }
});

botonArriba.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});