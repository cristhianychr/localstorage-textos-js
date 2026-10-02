// VARIABLES
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// EVENT LISTENERS
eventListeners();

function eventListeners() {
    // Cuando el usuario agrega un nuevo tweets
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento esta list
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    });
}


// FUNCIONES

function agregarTweet(e) {
    e.preventDefault();

    // TextArea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación...
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    //console.log(tweets);

    // Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar formulario
    formulario.reset();
}

// Mostrar Mensaje de Error
function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        // Elimina la alerta despues de 3s
        mensajeError.remove();
    }, 3000);

}

function crearHTML() {
    limpiarHTML();
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            // Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            // Añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML
            const li = document.createElement('li');
            
            // Anañadir el texto
            li.innerText =  tweet.tweet;

            // Asignar el botón
            li.appendChild(btnEliminar);

            // Insertando en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega los Tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// Limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.firstChild.remove();
    }
}