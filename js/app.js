//Variables
const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const listaCarrito = document.querySelector("#lista-carrio");
const vaciarCarrito = document.querySelector("#vaciar-carrito")


handleFunctions();
function handleFunctions() {
    //cuando agregas un curso presionando el btn" Agregar al carrito"
    listaCursos.addEventListener("click", agregarCurso)
}

//Functions
function agregarCurso(e) {
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatos(cursoSeleccionado);
    }
}

//Lee el contenido del HTML al que le dimos cick y extrae la informacon del curso
function leerDatos(curso) {
    console.log(curso);


    //crear un objeto con el contenido actual
    const infoCurso = {
        imagen: curso.querySelector("img").src,
        titulo: curso.querySelector("h4").textContent,
        precio: curso.querySelector(".precio span").textContent,
        id: curso.querySelector("a").getAtttribute("data-id"),

    }
    console.log(infoCurso)
}

