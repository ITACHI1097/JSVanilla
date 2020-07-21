console.log("hola mundo!");
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban";

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre;
}

const getUser = new Promise(function (todoBien, todoMal) {
  // llamada a un api en cierto tiempo
  setTimeout(function () {
    ///luego de 3 segundos se ejecuta
    todoBien("Se ejecuto perfecto Unito");
  }, 3000);
});

const getUserAll = new Promise(function (todoBien, todoMal) {
  // llamada a un api en cierto tiempo
  setTimeout(function () {
    ///luego de 3 segundos se ejecuta
    todoBien("Se ejecuto perfecto TODOS");
  }, 5000);
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
Promise.race([getUser, getUserAll])
  .then(function (Message) {
    console.log(Message);
  })
  .catch(function (Message) {
    console.log(Message);
  });

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
fetch("https://randomuser.me/api/sdfsd")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (user) {
    console.log(user);
    console.log("user: ", user.results[0].name.first);
  })
  .catch(function (error) {
    console.log("algo fallo");
  });

/// ASYNC Function

(async function load() {
  //espera las peticiones de la API
  //await
  // 'https://yts.mx/api/v2/list_movies.json?genre=action'
  const BASE_API = "https://yts.mx/api/v2/";

  async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    // Esperamos a que termine esas operaciones para continuar
    //Ejecutamos codigo async que se lee secuencialmente
    
    if (data.data.movie_count > 0){
      return data
    }
    else{
      throw new Error('No se encontro ningun resultado')
    }
  }

  const $form = document.getElementById("form");
  const $home = document.getElementById("home");
  const $featuringContainer = document.getElementById("featuring");

  function setAttributes($element, attributes) {
    for (const key in attributes) {
      $element.setAttribute(key, attributes[key]);
      //$element.getAttributes(key, attributes[key])
    }
  }

  function featuringTemplate(movie) {
    return `
      <div class="featuring">
        <div class="featuring-image">
          <img src="${movie.medium_cover_image}" width="70" height="100" alt="">
        </div>
        <div class="featuring-content">
          <p class="featuring-title">Pelicula encontrada</p>
          <p class="featuring-album">${movie.title}</p>
        </div>
      </div>
      `;
  }

  $form.addEventListener("submit", async (event) => {
    event.preventDefault();

    $home.classList.add("search-active");

    const $loader = document.createElement("img");
    setAttributes($loader, {
      src: "src/images/loader.gif",
      height: 50,
      width: 50,
    });
    $featuringContainer.append($loader);

    try {
      const data = new FormData($form);
      //const movie = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
      const {
        data: { movies: movie },
      } = await getData(
        `${BASE_API}list_movies.json?limit=1&query_term=${data.get("name")}`
      );
      const HTMLString = featuringTemplate(movie[0]);
      $featuringContainer.innerHTML = HTMLString;
    } catch (error) {
      debugger
      alert(error.message)
      $loader.remove()
      $home.classList.remove('search-active')
    }
    
  });

  // Vanilla Template Literals
  function videoItemTemplate(movie, category) {
    return `
      <div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
        <div class="primaryPlaylistItem-image">
            <p>${movie.id}</p>
            <img src="${movie.medium_cover_image}">
        </div>
        <h4 class="primaryPlaylistItem-title">
          ${movie.title}
        </h4>
      </div>
    `;
  }
  function createTemplate(HTMLstring) {
    const html = document.implementation.createHTMLDocument();
    //debbuger
    html.body.innerHTML = HTMLstring;
    return html.body.children[0];
  }
  // console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'bitcoin'));
  //debugger

  function addEventClick($element) {
    $element.addEventListener("click", () => {
      //alert('click!')
      showModal($element);
    });
  }

  function renderMovieList(list, $container, category) {
    //actionList.data.movies
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLstring = videoItemTemplate(movie, category);
      const movieElment = createTemplate(HTMLstring);

      $container.append(movieElment);
      const image = movieElment.querySelector("img");
      image.addEventListener("load", (event) => {
        event.target.classList.add("fadeIn");
      });

      //animation
      //movieElment.classList.add('fadeIn')

      addEventClick(movieElment);

      //$actionContainer.innerHTML += HTMLstring;
      //$actionContainer.append(movieElment)
      //console.log(HTMLstring);
    });
  }

  ///SELECTORES HTML
  const {
    data: { movies: actionList },
  } = await getData(`${BASE_API}list_movies.json?genre=action`);
  const $actionContainer = document.querySelector("#action");
  renderMovieList(actionList, $actionContainer, "action");

  const {
    data: { movies: dramaList },
  } = await getData(`${BASE_API}list_movies.json?genre=drama`);
  const $dramaContainer = document.getElementById("drama");
  renderMovieList(dramaList, $dramaContainer, "drama");

  const {
    data: { movies: animationList },
  } = await getData(`${BASE_API}list_movies.json?genre=animation`);
  const $animationContainer = document.getElementById("animation");
  renderMovieList(animationList, $animationContainer, "animation");

  //Async Await

  ///Promesas
  /* let dramaList
  await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
  .then(function (data){
    console.log('dramaList', data);
    dramaList = data;
  }); */
  //console.log(actionList, dramaList, animationList);

  /* const $home = $('.home .list #item');
  const $home = document.getElementById('modal');
   */

  const $modal = document.getElementById("modal");
  const $overlay = document.getElementById("overlay");
  const $hideModal = document.getElementById("hide-modal");

  const $modalTitle = $modal.querySelector("h1");
  const $modalImage = $modal.querySelector("img");
  const $modalDescription = $modal.querySelector("p");

  function findById(list, id) {
    return list.find((movie) => movie.id === parseInt(id, 10));
  }

  function findMovie(id, category) {
    switch (category) {
      case "action": {
        return findById(actionList, id);
      }
      case "drama": {
        return findById(dramaList, id);
      }
      case "animation": {
        return findById(animationList, id);
      }
      default:
        break;
    }
  }

  function showModal($element) {
    $overlay.classList.add("active");
    $modal.style.animation = "modalIn .5s forwards";

    const id = $element.dataset.id;
    const category = $element.dataset.category;

    const data = findMovie(id, category);

    $modalTitle.textContent = data.title;
    $modalImage.setAttribute("src", data.medium_cover_image);
    $modalDescription.textContent = data.description_full;
  }

  //$showModal.addEventListener('click', showModal)

  function hideModal() {
    $overlay.classList.remove("active");
    $modal.style.animation = "modalOut .5s forwards";
  }

  $hideModal.addEventListener("click", hideModal);

  //Template in jQuery
  const template =
    '<div class="primaryPlaylistItem">' +
    '<div class="primaryPlaylistItem-image">' +
    '<img src="src/images/covers/midnight.jpg">' +
    "</div>" +
    '<h4 class="primaryPlaylistItem-title">' +
    "Titulo de la peli" +
    "</h4> " +
    "</div>";
})();
//llamarla
//load()
