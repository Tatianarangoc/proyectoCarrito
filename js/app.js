//Variables
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito")
let articulosCarrito = [];


handleFunctions();
function handleFunctions() {
    //cuando agregas un curso presionando el btn" Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso);
    //Elimina cursos de carrito
    carrito.addEventListener("click", eliminarCurso);
    //Vaciar el carrito
    vaciarCarrito.addEventListener("click", (e) => {
        e.preventDefault();
        articulosCarrito = []; //Reseteamos el arreglo
        limpiarHTML(); //Eliminamos todo el HTML
    })
}

//Functions
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const curso = e.target.parentElement.parentElement;
        leerDatosCurso(curso);
    }
}
//Eliminar un curso del carrito
function eliminarCurso(e) {

    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        // e.target.parentElement.parentElement.remove();
        const cursoId = e.target.getAttribute('data-id')

        // Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }

}

//Lee el contenido del HTML al que le dimos cick y extrae la informacon del curso
function leerDatosCurso(curso) {
    //console.log(curso);


    //crear un objeto con el contenido actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAttribute("data-id"),
        cantidad: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        //agregamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //Retorna el objeto actualizado
            } else {
                return curso;//Retorna los objetos que no son los duplicados
            }
        })

        articulosCarrito = [...cursos];
    } else {
        //Agregar elementos al arreglo carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {

    //Limpiar el Html
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
        contenedorCarrito.appendChild(row);
    });
}

//Eliminar los cursos del tbody
function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = "";
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}