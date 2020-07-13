console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

const getUser = new Promise(function (todoBien, todoMal) {
  // llamada a un api en cierto tiempo
  setTimeout(function () {
    ///luego de 3 segundos se ejecuta
    todoBien('Se ejecuto perfecto Unito');
  }, 3000)
});

const getUserAll = new Promise(function (todoBien, todoMal) {
  // llamada a un api en cierto tiempo
  setTimeout(function () {
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
  .then(function (Message) {
    console.log(Message)
  })
  .catch(function (Message) {
    console.log(Message)
  })

// error en todas las promesas



//XMLHTTPRequest 
// $.ajax('https://randomuser.me/api/dsad',{
//   method: 'GET',
//   success: function(data){
//     console.log(data)
//   },
//   error: function(error){
//     console.log(error)
//   }
// })


// podemos obtener json ->response.json()
fetch('https://randomuser.me/api/sdfsd')
  .then(function (response) {
    console.log(response)
    return response.json()
  })
  .then(function (user) {
    console.log(user);
    console.log('user: ', user.results[0].name.first);
  })
  .catch(function (error) {
    console.log('algo fallo')
  });



/// ASYNC Function


(async function load() {
  //espera las peticiones de la API
  //await
  // 'https://yts.mx/api/v2/list_movies.json?genre=action'
  async function getData(url) {
    const response = await fetch(url)
    const data = await response.json()
    // Esperamos a que termine esas operaciones para continuar
    //Ejecutamos codigo async que se lee secuencialmente
    return data
  }

  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  
  $form.addEventListener('submit', (event) => {
    event.preventDefault();
    $home.classList.add('search-active')
  })
  //Async Await
  const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  //debugger
  const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')

  ///Promesas
  /* let dramaList
  await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  .then(function (data){
    console.log('dramaList', data);
    dramaList = data;
  }); */

  console.log(actionList, dramaList, animationList);



   // Vanilla Template Literals
   function videoItemTemplate(movie) {
    return(
        `
      <div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
            <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>
    `
    )
  }
  function createTemplate(HTMLstring){
    const html = document.implementation.createHTMLDocument()
    //debbuger
    html.body.innerHTML = HTMLstring;
    return html.body.children[0]
  }
  // console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'));
  //debugger

  
  function addEventClick($element){
    $element.addEventListener('click', () => {
      //alert('click!')
      showModal()
    })
  }
  
  function renderMovieList(list, $container) {
    //actionList.data.movies
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLstring = videoItemTemplate(movie)
      const movieElment = createTemplate(HTMLstring)
      
      $container.append(movieElment)

      addEventClick(movieElment);

      //$actionContainer.innerHTML += HTMLstring;
      //$actionContainer.append(movieElment)
      //console.log(HTMLstring);
    });    
  }
  

  ///SELECTORES HTML

  const $actionContainer = document.querySelector('#action')
  renderMovieList(actionList.data.movies, $actionContainer) 
  
  const $dramaContainer = document.getElementById('drama')
  renderMovieList(dramaList.data.movies, $dramaContainer) 

  const $animationContainer = document.getElementById('animation')
  renderMovieList(animationList.data.movies, $animationContainer) 


  /* const $home = $('.home .list #item');
  const $home = document.getElementById('modal');
   */
  
  const $featuringContainer = document.getElementById('featuring')

  const $modal = document.getElementById('modal');
  const $overlay = document.getElementById('overlay');
  const $hideModal = document.getElementById('hide-modal')

  const $modalTitle = $modal.querySelector('h1')
  const $modalImage = $modal.querySelector('img')
  const $modalDescription = $modal.querySelector('p')


  function showModal() {
    $overlay.classList.add('active');
    $modal.style.animation = 'modalIn .5s forwards'
    $modal.style.co
  }

  //$showModal.addEventListener('click', showModal)

  function hideModal() {
    $overlay.classList.remove('active');
    $modal.style.animation = 'modalOut .5s forwards'
  }

  $hideModal.addEventListener('click', hideModal)


  //Template in jQuery
  const template = 
        '<div class="primaryPlaylistItem">' +
          '<div class="primaryPlaylistItem-image">' +
            '<img src="src/images/covers/midnight.jpg">' +
          '</div>' +
            '<h4 class="primaryPlaylistItem-title">' +
              'Titulo de la peli' +
            '</h4> '+
        '</div>';


 

  })()

//llamarla
//load()



