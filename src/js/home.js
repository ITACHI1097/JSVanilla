console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUser = new Promise(function(todoBien, todoMal) {
  // llamada a un api en cierto tiempo
  setTimeout(function() {
    ///luego de 3 segundos se ejecuta
    todoBien('Se ejecuto perfecto Unito');
  }, 3000)
});

const getUserAll = new Promise(function(todoBien, todoMal) {
  // llamada a un api en cierto tiempo
  setTimeout(function() {
    ///luego de 3 segundos se ejecuta
    todoBien('Se ejecuto perfecto TODOS');
  }, 5000)
});

// getUser
//   .then(function(){
//     console.log('todo esta bien')
//   })
//   .catch(function(Message){
//     console.log(Message);
//   })
///error en esta promesa

//Promise.all
Promise.race([
  getUser,
  getUserAll,
])
.then(function(Message) {
  console.log(Message)
})
.catch(function(Message) {
  console.log(Message)
})

// error en todas las promesas