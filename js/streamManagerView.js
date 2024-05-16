import {
  newfCategory,
  newfActor,
  newfDirector,
  newfProduction,
  newfRemoveProduction,
  newfRemoveCategory,
  newfRemoveDirector,
  newfRemoveActor,
  newfAssingDirector,
  newfDesAssingDirector,
  newfAssingActor,
  newfdesAssingActor
} from "./validation.js";

// Variable privada para el history
const EXECUTE_HANDLER = Symbol("executeHandler");

// Creamos la clase de la vista
class StreamManagerView {
  constructor() {
    // Zona inicial de nuestra pagina
    this.inicio = document.getElementById("zonaInicio");

    // Zona central de nuestra pagina
    this.central = document.getElementById("central");

    // Zona del menu de nuestra pagina
    this.menu = document.getElementById("menu");

    // Creamos un mapa que contendra las ventanas que tenemos abiertas
    this.productionsOpen = new Map();
    this.contWindow = 0;
  }

  [EXECUTE_HANDLER](
    handler,
    handlerArguments,
    scrollElement,
    data,
    url,
    event
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    if (scroll) scroll.scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  // Creamos el bind para el enlace del inicio
  bindInit(handler) {
    document.getElementById("inicio").addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "inicio" },
        "#",
        event
      );
    });
  }

  // Metodo con el qe mostraremos las categorias que tenemos disponibles en la zona central
  showCategories(categories) {
    // Borramos la zona central de nuestra pagina
    this.central.replaceChildren();

    // Nos creamos el contenedor de las categorias y le aniadimos las respectivas clases de boostrap
    const container = document.createElement("div");
    container.classList.add("row");
    container.id = "category-list";

    // Le aniadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML("beforeend", "<h1>Categorias</h1>");

    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card_show_categories rounded-3 mt-20">
                    <a data-category="${category.category.name}" href="#category-list">
                        <div class="card-body text-center">
                            <p class="card-text">${category.category.name}</p>
                        </div>
                    </a>
                </div>
                `
      );
    }

    // Ponemos el contenedor en nuestro html
    this.central.append(container);
  }

  // Metodo con el que mostraremos las categorias que tenemos disponibles en la zona del menu
  showCategoriesInNav(categories) {
    const itemCategories = document.getElementById("navCategories");
    const container = itemCategories.nextElementSibling;
    container.replaceChildren();
    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
                <li>
                    <a data-category="${category.category.name}"
                    class="dropdown-item-category" 
                    href="#"> 
                        ${category.category.name}
                    </a>
                </li>
                `
      );
    }
  }

  // Metodo con el que mostraremos las actores que tenemos disponibles en la zona del menu
  showActorsInNav(actors) {
    const itemCategories = document.getElementById("navActores");
    const container = itemCategories.nextElementSibling;
    container.replaceChildren();
    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const actor of actors) {
      container.insertAdjacentHTML(
        "beforeend",
        `
        <li>
        <a data-actor="${actor.actors.name}"
        class="dropdown-item" 
        href="#"> 
            ${actor.actors.name}
        </a>
    </li>
                `
      );
    }
  }

  // Metodo con el que mostraremos las actores que tenemos disponibles en la zona del menu
  showDirectorsInNav(directors) {
    const itemCategories = document.getElementById("navDirectors");
    const container = itemCategories.nextElementSibling;
    container.replaceChildren();
    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const director of directors) {
      container.insertAdjacentHTML(
        "beforeend",
        `
        <li>
                    <a data-director="${director.director.name}"
                    class="dropdown-item" 
                    href="#"> 
                        ${director.director.name}
                    </a>
                </li>
                `
      );
    }
  }

  // Metodo con el que mostraremos las categorias que tenemos disponibles en la zona central
  showRandomProductions(productions) {
    if (this.inicio.children.length > 0) this.inicio.children[0].remove();

    // Nos creamos el contenedor de las categorias y le aniadimos las respectivas clases de boostrap
    const container = document.createElement("div");
    container.classList.add("row");
    container.id = "randomProduction-list";

    // Le aniadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML(
      "beforeend",
      "<h1>Seleccion de contenido destacado</h1>"
    );

    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const pro of productions) {
      container.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card_random_production rounded-3 mt-20">
                    <a data-production="${pro.title}" href="#randomProduction-list">
                        <div class="card-body text-center">
                            <p class="card-text">${pro.title}</p>
                        </div>
                    </a>
                </div>
        `
      );
    }

    // Ponemos el contenedor en nuestro html
    this.inicio.append(container);
  }

  // Metodo con el que mostraremos una lista de las producciones
  showProductionList(productions, name) {
    // Borramos la zona central de nuestra pagina
    this.central.replaceChildren();

    // Nos creamos el contenedor que contendra la lista de producciones y le asignamos los respectivos valores
    const container = document.createElement("div");
    container.classList.add("row");
    container.id = "production-list";

    // Le aniadimos a nuestro contenedor el nombre de la categoria pulsada
    container.insertAdjacentHTML(
      "beforeend",
      `
            <h1>Producciones de ${name}</h1>
        `
    );

    // Iteramos sobres las producciones que recibimos de la categoria
    for (const prod of productions) {
      container.insertAdjacentHTML(
        "beforeend",
        `
                    <div class="card-production-list rounded-3 mt-20">
                    <a data-production="${prod.title}" href="#production-list">

                        <div class="card-body text-center">
                            <p class="card-text">${prod.title}</p>
                        </div>
                        </a>
                    </div>
                `
      );
    }

    // Aniadimos el container a la zona central
    this.central.append(container);
  }

  // Metodo que nos imprimira los datos de una produccion en concreto
  showProduction(production) {
    // Borramos la zona central de nuestra pagina
    this.central.replaceChildren();

    // Nos creamos el contenedor de nuestra produccion
    const container = document.createElement("div");
    container.classList.add("card");

    // Si la produccion existe mostramos la tarjeta con la informacion
    if (production) {
      // Le indicamos al contenedor la id
      container.id = "production-item";

      // Aniadimos la tarjeta al contenedor
      container.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card-body-production">
                  <img src=${production.image} class="card-img-top-production">
                    <h3 class="card-title">Titulo: ${production.title}</h5>
                    <p class="card-text">Nacionalidad: ${production.nationality}</p>
                    <p class="card-text">Sinopsis: ${production.synopsis}</p>
                    <p class="card-text">Fecha de estreno: ${production.publication}</p>
                    <button class='btn btn-secondary font-weight-bold mr-2' id='produc-open' data-produc="${production.title}">Nueva ventana</button>
                </div>
                `
      );
    }

    // Aniadimos el container a la zona central
    this.central.append(container);
  }

  // Metodo que nos imprimira los datos de una produccion en concreto
  showActor(act) {
    // Nos creamos el contenedor de nuestra produccion
    const container = document.createElement("div");
    container.classList.add("card");

    // Si la produccion existe mostramos la tarjeta con la informacion
    if (act) {
      // Le indicamos al contenedor la id
      container.id = "actor-item";

      // Aniadimos la tarjeta al contenedor
      container.insertAdjacentHTML(
        "beforeend",
        `
                <img src=${act.picture} class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">Nombre: ${act.name}</h5>
                    <p class="card-text">Apellido: ${act.lastname1}</p>
                    <p class="card-text">Fecha de nacimiento: ${act.born}</p>
                </div>
                `
      );
    }

    // Aniadimos el container a la zona central
    this.central.append(container);
  }

  // Metodo que nos imprimira los datos de una produccion en concreto
  showDirector(director) {
    // Nos creamos el contenedor de nuestra produccion
    const container = document.createElement("div");
    container.classList.add("card");

    // Si la produccion existe mostramos la tarjeta con la informacion
    if (director) {
      // Le indicamos al contenedor la id
      container.id = "director-item";

      // Aniadimos la tarjeta al contenedor
      container.insertAdjacentHTML(
        "beforeend",
        `
                    <img src=${director.picture} class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">Nombre: ${director.name}</h5>
                        <p class="card-text">Apellido: ${director.lastname1}</p>
                        <p class="card-text">Fecha de nacimiento: ${director.born}</p>
                    </div>
                    `
      );
    }

    // Aniadimos el container a la zona central
    this.central.append(container);
  }

  // Metodo con el que mostramos las producciones en una nueva pagina
  showProductionInNewWindow(production, newWindow) {
    // Obtenemos el main de nuestra pagina
    const main = newWindow.document.querySelector("main");

    // Remplazamos los elementos que tenga dentro el main de la nueva ventana
    main.replaceChildren();

    // Nos declaramos el contenedor donde ira nuestra produccion
    let container;

    if (production) {
      newWindow.document.title = `${production.title}`;

      // Definimos nuestro contenedor
      container = document.createElement("div");
      container.classList.add("card");

      // Le indicamos al contenedor la id
      container.id = "production-item";

      // Aniadimos la tarjeta al contenedor
      container.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card-body-production">
                <img src=${production.image} class="card-img-top-production">
                    <h3 class="card-title">Titulo: ${production.title}</h5>
                    <p class="card-text">Nacionalidad: ${production.nationality}</p>
                    <p class="card-text">Sinopsis: ${production.synopsis}</p>
                    <p class="card-text">Fecha de estreno: ${production.publication}</p>
                </div>
                `
      );
    } else {
      // Definimos nuestro contenedor
      container = document.createElement("div");

      // Le indicamos al contenedor la id
      container.id = "production-item";

      // Aniadimos la tarjeta al contenedor
      container.insertAdjacentHTML(
        "beforeend",
        `<p>No hemos encontrado la produccion solicitada.</p>`
      );
    }

    // Aniadimos el container a la zona central
    main.append(container);
    newWindow.document.body.scrollIntoView();
  }

  // Metodo con el que mostraremos las actores que tenemos disponibles en la zona del menu
  showCloseInNav() {
    // Nos creamos el li de las categorias y le aniadimos las respectivas clases de boostrap
    const li = document.createElement("li");
    li.classList.add("nav-item");

    li.insertAdjacentHTML(
      "beforeend",
      `
        <a id="closeButton" href="#">Cerrar Ventanas</a>
        `
    );

    this.menu.append(li);
  }

  // Metodo que nos mostrara en el nav un desplegable con todas las opciones de formularios
  showFormMenu() {
    // Nos creamos el li de las categorias y le aniadimos las respectivas clases de boostrap
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");

    // Le aniadimos el titulo a nuestro contenedor
    li.insertAdjacentHTML(
      "beforeend",
      '<a class="nav-link dropdown-toggle" href="#" id="navForm" role="button" data-bs-toggle="dropdown" aria-expanded="false">Formularios</a>'
    );

    // Nos creamos el ul que ira dentro de nuestr dropdown y le aniadimos las respectivas clases de boostrap
    const ul = document.createElement("ul");
    ul.classList.add("dropdown-menu");

    // Aniadimos los elemtos
    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormCate' class="dropdown-item"  href="#new-category">Crear Categoria</a>
      </li>
      `
    );

    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormActor' class="dropdown-item"  href="#new-actor">Crear actor</a>
      </li>
      `
    );

    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormDirector' class="dropdown-item"  href="#new-director">Crear Director</a>
      </li>
      `
    );

    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormProduction' class="dropdown-item"  href="#new-production">Crear Produccion</a>
      </li>
      `
    );

    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormRemoveProduction' class="dropdown-item"  href="#remove-production">Eliminar Produccion</a>
      </li>
      `
    );

    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormRemoveCategory' class="dropdown-item"  href="#remove-category">Eliminar Categoria</a>
      </li>
      `
    );

    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormRemoveDirector' class="dropdown-item"  href="#remove-director">Eliminar Director</a>
      </li>
      `
    );

    
    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormRemoveActor' class="dropdown-item"  href="#remove-actor">Eliminar Actor</a>
      </li>
      `
    );

        
    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormAssginDirector' class="dropdown-item"  href="#assing-director">Asignar Director Produccion</a>
      </li>
      `
    );

            
    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormDesAssginDirector' class="dropdown-item"  href="#desassing-director">DesAsignar Director Produccion</a>
      </li>
      `
    );

    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormAssignActor' class="dropdown-item"  href="#assing-actor">Asignar Actor Produccion</a>
      </li>
      `
    );


    ul.insertAdjacentHTML(
      "beforeend",
      `
      <li>
        <a id='navFormDesAssignActor' class="dropdown-item"  href="#desassing-actor">DesAsignar Actor Produccion</a>
      </li>
      `
    );


    li.append(ul);
    // Aniadimos el li al menu
    this.menu.append(li);
  }

  // Metodo con el que mostraremos el formulario para una nueva categoria
  showCategoryForm() {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "new-category";

    container.insertAdjacentHTML("beforeend", `<h1>Nueva categoria</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
        <form name="fCategory" role="form" id="fCategory" novalidate>

        <div class="mb-3">
          <label for="inputNamefCategory" class="form-label">Nombre Categoria</label>
          <div class="input-group">
            <input class="form-control-sm" type="text" id="inputNamefCategory" name="inputNamefCategory" placeholder="Introduce el nombre de la categoria." value="" required />
            <div class="invalid-feedback d-none">Debe introducir un nombre para la categoria.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mb-3">
          <label for="inputDesfCategory" class="form-label">Descripcion Categoria</label>
          <div class="input-group">
            <input class="form-control-sm" type="text" id="inputDesfCategory" name="inputDesfCategory" placeholder="Introduce la descripcion de la categoria." value="" />
            <div class="invalid-feedback d-none">Debe introducir un texto para la descripcion.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
        </div>
        </form>
      `
    );

    this.central.append(container);
  }

  // Metodo con el que mostraremos el formulario para una nueva categoria
  showActorForm() {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "new-actor";

    container.insertAdjacentHTML("beforeend", `<h1>Nuevo Actor</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fActor" role="form" id="fActor" novalidate>
      <div class="mb-2">
          <label for="inputNamefActor" class="form-label">Nombre actor</label>
          <input class="form-control-sm" type="text" id="inputNamefActor" name="inputNamefActor" placeholder="Introduce el nombre del actor." required />
          <div class="invalid-feedback d-none">Debe introducir un nombre para el actor.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <label for="inputNamefLastname1" class="form-label">Apellido1 actor</label>
          <input class="form-control-sm" type="text" id="inputNamefLastname1" name="inputNamefLastname1" placeholder="Introduce el apellido1 del actor." required />
          <div class="invalid-feedback d-none">Debe introducir un apellido para el actor.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <label for="inputNamefLastname2" class="form-label">Apellido2 actor</label>
          <input class="form-control-sm" type="text" id="inputNamefLastname2" name="inputNamefLastname2" placeholder="Introduce el apellido2 del actor." required />
          <div class="invalid-feedback d-none">Debe introducir un apellido para el actor.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <label for="inputNamefBorn" class="form-label">Fecha nacimiento actor</label>
          <input class="form-control-sm" type="date" id="inputNamefBorn" name="inputNamefBorn" required />
          <div class="invalid-feedback d-none">Debe introducir un nacimiento para el actor.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <label for="inputNamefPicture" class="form-label">Imagen actor</label>
          <input class="form-control-sm" type="url" id="inputNamefPicture" name="inputNamefPicture" placeholder="Introduce la imagen del actor." required />
          <div class="invalid-feedback d-none">Debe introducir una imagen para el actor.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
  </form>
  
      `
    );

    this.central.append(container);
  }

  // Metodo con el que mostraremos el formulario para una nueva categoria
  showDirectorForm() {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "new-director";

    container.insertAdjacentHTML("beforeend", `<h1>Nuevo Director</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fDirector" role="form" id="fDirector" novalidate>
      <div class="mb-2">
          <label for="inputNamefDirector" class="form-label">Nombre director</label>
          <input class="form-control-sm" type="text" id="inputNamefDirector" name="inputNamefDirector" placeholder="Introduce el nombre del director." required />
          <div class="invalid-feedback d-none">Debe introducir un nombre para el director.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <label for="inputNamefLastname1" class="form-label">Apellido1 director</label>
          <input class="form-control-sm" type="text" id="inputNamefLastname1" name="inputNamefLastname1" placeholder="Introduce el apellido1 del director." required />
          <div class="invalid-feedback d-none">Debe introducir un apellido para el director.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <label for="inputNamefLastname2" class="form-label">Apellido2 director</label>
          <input class="form-control-sm" type="text" id="inputNamefLastname2" name="inputNamefLastname2" placeholder="Introduce el apellido2 del director." required />
          <div class="invalid-feedback d-none">Debe introducir un apellido para el director.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <label for="inputNamefBorn" class="form-label">Fecha nacimiento director</label>
          <input class="form-control-sm" type="date" id="inputNamefBorn" name="inputNamefBorn" required />
          <div class="invalid-feedback d-none">Debe introducir un nacimiento para el director.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <label for="inputNamefPicture" class="form-label">Imagen director</label>
          <input class="form-control-sm" type="url" id="inputNamefPicture" name="inputNamefPicture" placeholder="Introduce la imagen del director." required />
          <div class="invalid-feedback d-none">Debe introducir una imagen para el director.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>
  
      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
  </form>
  
      `
    );

    this.central.append(container);
  }

  // Metodo con el que mostraremos el formulario para una nueva categoria
  showProductionForm(categories, directors) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "new-director";

    container.insertAdjacentHTML("beforeend", `<h1>Nueva Produccion</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fProdcution" role="form" id="fProdcution" novalidate>

      <div class="mb-2">
      <label for="selectTypeProduction" class="form-label">Tipo de producción</label>
      <select class="form-control-sm" id="selectTypeProduction" name="selectTypeProduction" required>
          <option value="" disabled selected>Selecciona el tipo de producción</option>
          <option value="pelicula">Pelicula</option>
          <option value="serie">Serie</option>
      </select>
      <div class="invalid-feedback d-none">Debe seleccionar el tipo de producción.</div>
      <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
          <label for="inputNamefProduction" class="form-label">Titulo</label>
          <input class="form-control-sm" type="text" id="inputNamefProduction" name="inputNamefProduction" placeholder="Introduce el titulo de la produccion." required />
          <div class="invalid-feedback d-none">Debe introducir un titulo para la produccion.</div>
          <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
        <label for="inputnationalityfProduction" class="form-label">Nacionalidad</label>
        <input class="form-control-sm" type="text" id="inputnationalityfProduction" name="inputnationalityfProduction" placeholder="Introduce la nacionalidad de la produccion." required />
        <div class="invalid-feedback d-none">Debe introducir una nacionalidad para la produccion.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
        <label for="inputpublicationfProduction" class="form-label">Fecha de Estreno</label>
        <input class="form-control-sm" type="date" id="inputpublicationfProduction" name="inputpublicationfProduction" placeholder="Introduce la fecha de estreno de la produccion." required />
        <div class="invalid-feedback d-none">Debe introducir una fecha de estreno para la produccion.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
        <label for="inputSipnosisfProduction" class="form-label">Sipnosis</label>
        <input class="form-control-sm" type="text" id="inputSipnosisfProduction" name="inputSipnosisfProduction" placeholder="Introduce la sipnosis de la produccion." required />
        <div class="invalid-feedback d-none">Debe introducir una sipnosis para la produccion.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
        <label for="inputimagefProduction" class="form-label">Imagen</label>
        <input class="form-control-sm" type="link" id="inputimagefProduction" name="inputimagefProduction" placeholder="Introduce la imagen de la produccion." required />
        <div class="invalid-feedback d-none">Debe introducir una imagen para la produccion.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>
      
      <div class="mb-2">
        <label for="inputseasonfProduction" class="form-label">Numero Temporadas</label>
        <input class="form-control-sm" type="number" id="inputseasonfProduction" name="inputseasonfProduction" placeholder="Introduce las temporadas de la produccion."/>
        <div class="invalid-feedback d-none">Debe introducir as temporadas para la produccion.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>


      <div class="mb-2">
        <label for="inputcategoryfProduction" class="form-label">Seleccione la categoria</label>
        <select class="form-control-sm" id="inputcategoryfProduction" name="inputcategoryfProduction" size="3" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione una categoria para la produccion.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
        <label for="inputdirectorfProduction" class="form-label">Seleccione Director</label>
        <select class="form-control-sm" id="inputdirectorfProduction" name="inputdirectorfProduction" size="3" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione un director para la produccion.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
      </form>
  
      `
    );

    this.central.append(container);

    const categoySelector = document.getElementById("inputcategoryfProduction");

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const category of categories) {
      categoySelector.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${category.category.name}'>${category.category.name}</option>
        `
      );
    }

    const categoryDirectory = document.getElementById(
      "inputdirectorfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const director of directors) {
      categoryDirectory.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${director.director.name}'>${director.director.name}</option>
        `
      );
    }
  }

  
  // Metodo con el que mostraremos el formulario para una nueva categoria
  showRemoveDirector(directors) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "new-director";

    container.insertAdjacentHTML("beforeend", `<h1>Eliminar Director</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fRemoveDirectors" role="form" id="fRemoveDirectors" novalidate>

      <div class="mb-2">
        <label for="inputdirectorfProduction" class="form-label">Seleccione Director</label>
        <select class="form-control-sm" id="inputdirectorfProduction" name="inputdirectorfProduction" size="3" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione un director para la eliminar.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
      </form>
  
      `
    );

    this.central.append(container);

    const categoryDirectory = document.getElementById(
      "inputdirectorfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const director of directors) {
      categoryDirectory.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${director.director.name}'>${director.director.name}</option>
        `
      );
    }
  }


   
  // Metodo con el que mostraremos el formulario para una nueva categoria
  showAssignDirector(directors, productions) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "assign-director";

    container.insertAdjacentHTML("beforeend", `<h1>Asignar Director a Produccion</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fAssignDirector" role="form" id="fAssignDirector" novalidate>

      <div class="mb-2">
        <label for="inputdirectorfProduction" class="form-label">Seleccione Director</label>
        <select class="form-control-sm" id="inputdirectorfProduction" name="inputdirectorfProduction" size="3" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione un director para la eliminar.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
      <label for="inputfProduction" class="form-label">Seleccione Producciones</label>
      <select class="form-control-sm" id="inputfProduction" name="inputfProduction" size="7" multiple required>
      </select>
      <div class="invalid-feedback d-none">Seleccione una produccion .</div>
      <div class="valid-feedback">Correcto.</div>
      </div>


      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
      </form>
  
      `
    );

    this.central.append(container);

    const categoryDirectory = document.getElementById(
      "inputdirectorfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const director of directors) {
      categoryDirectory.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${director.director.name}'>${director.director.name}</option>
        `
      );
    }

    
    const prodcutionSelector = document.getElementById(
      "inputfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const production of productions) {
      prodcutionSelector.insertAdjacentHTML(
        "beforeend",
        `
            <option value='${production.title}'>${production.title}</option>
          `
      );
    }
  }


   
  // Metodo con el que mostraremos el formulario para una nueva categoria
  showDesAssignDirector(directors, productions) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "assign-director";

    container.insertAdjacentHTML("beforeend", `<h1>Desasignar actor a Produccion</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fDesAssignDirector" role="form" id="fDesAssignDirector" novalidate>

      <div class="mb-2">
        <label for="inputdirectorfProduction" class="form-label">Seleccione Director</label>
        <select class="form-control-sm" id="inputdirectorfProduction" name="inputdirectorfProduction" size="3" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione un director para la desasignar.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
      <label for="inputfProduction" class="form-label">Seleccione Producciones</label>
      <select class="form-control-sm" id="inputfProduction" name="inputfProduction" size="7" multiple required>
      </select>
      <div class="invalid-feedback d-none">Seleccione una produccion .</div>
      <div class="valid-feedback">Correcto.</div>
      </div>


      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
      </form>
  
      `
    );

    this.central.append(container);

    const categoryDirectory = document.getElementById(
      "inputdirectorfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const director of directors) {
      categoryDirectory.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${director.director.name}'>${director.director.name}</option>
        `
      );
    }

    
    const prodcutionSelector = document.getElementById(
      "inputfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const production of productions) {
      prodcutionSelector.insertAdjacentHTML(
        "beforeend",
        `
            <option value='${production.title}'>${production.title}</option>
          `
      );
    }
  }

   // Metodo con el que mostraremos el formulario para una nueva categoria
   showAssignActor(actors, productions) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "assign-director";

    container.insertAdjacentHTML("beforeend", `<h1>Asignar Actor a Produccion</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fAssignActor" role="form" id="fAssignActor" novalidate>

      <div class="mb-2">
        <label for="inputactorfProduction" class="form-label">Seleccione Actor</label>
        <select class="form-control-sm" id="inputactorfProduction" name="inputactorfProduction" size="3" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione un actor para la asignar.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
      <label for="inputfProduction" class="form-label">Seleccione Producciones</label>
      <select class="form-control-sm" id="inputfProduction" name="inputfProduction" size="7" multiple required>
      </select>
      <div class="invalid-feedback d-none">Seleccione una produccion .</div>
      <div class="valid-feedback">Correcto.</div>
      </div>


      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
      </form>
  
      `
    );

    this.central.append(container);

    const categoryActor = document.getElementById(
      "inputactorfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const actor of actors) {
      categoryActor.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${actor.actors.name}'>${actor.actors.name}</option>
        `
      );
    }

    
    const prodcutionSelector = document.getElementById(
      "inputfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const production of productions) {
      prodcutionSelector.insertAdjacentHTML(
        "beforeend",
        `
            <option value='${production.title}'>${production.title}</option>
          `
      );
    }
  }

   // Metodo con el que mostraremos el formulario para una nueva categoria
   showDesAssignActor(actors, productions) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "desassign-director";

    container.insertAdjacentHTML("beforeend", `<h1>Desasignar Actor a Produccion</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fdesAssignActor" role="form" id="fdesAssignActor" novalidate>

      <div class="mb-2">
        <label for="inputactorfProduction" class="form-label">Seleccione Actor</label>
        <select class="form-control-sm" id="inputactorfProduction" name="inputactorfProduction" size="3" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione un actor para la asignar.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
      <label for="inputfProduction" class="form-label">Seleccione Producciones</label>
      <select class="form-control-sm" id="inputfProduction" name="inputfProduction" size="7" multiple required>
      </select>
      <div class="invalid-feedback d-none">Seleccione una produccion .</div>
      <div class="valid-feedback">Correcto.</div>
      </div>


      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
      </form>
  
      `
    );

    this.central.append(container);

    const categoryActor = document.getElementById(
      "inputactorfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const actor of actors) {
      categoryActor.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${actor.actors.name}'>${actor.actors.name}</option>
        `
      );
    }

    
    const prodcutionSelector = document.getElementById(
      "inputfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const production of productions) {
      prodcutionSelector.insertAdjacentHTML(
        "beforeend",
        `
            <option value='${production.title}'>${production.title}</option>
          `
      );
    }
  }




  // Metodo con el que mostraremos el formulario para una nueva categoria
  showRemoveActor(actors) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "remove-actor";

    container.insertAdjacentHTML("beforeend", `<h1>Eliminar Actor</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
      <form name="fRemoveActor" role="form" id="fRemoveActor" novalidate>

      <div class="mb-2">
        <label for="inputactorfProduction" class="form-label">Seleccione Actor</label>
        <select class="form-control-sm" id="inputactorfProduction" name="inputactorfProduction" size="3" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione un actor para la eliminar.</div>
        <div class="valid-feedback">Correcto.</div>
      </div>

      <div class="mb-2">
          <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
          <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
      </div>
      </form>
  
      `
    );

    this.central.append(container);

    const categoryDirectory = document.getElementById(
      "inputactorfProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const actor of actors) {
      categoryDirectory.insertAdjacentHTML(
        "beforeend",
        `
          <option value='${actor.actors.name}'>${actor.actors.name}</option>
        `
      );
    }
  }

  // Metodo con el que mostraremos el formulario para una nueva categoria
  showRemoveCategory(categories) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "new-director";

    container.insertAdjacentHTML("beforeend", `<h1>Nueva Produccion</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
        <form name="fRemoveCategory" role="form" id="fRemoveCategory" novalidate>
  
        <div class="mb-2">
          <label for="inputcategoryfProduction" class="form-label">Seleccione la categoria</label>
          <select class="form-control-sm" id="inputcategoryfProduction" name="inputcategoryfProduction" size="4" multiple required>
          </select>
          <div class="invalid-feedback d-none">Seleccione una categoria para eliminar.</div>
          <div class="valid-feedback">Correcto.</div>
        </div>

        <div class="mb-2">
            <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
            <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
        </div>
        </form>
    
        `
    );

    this.central.append(container);

    const categoySelector = document.getElementById("inputcategoryfProduction");

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const category of categories) {
      categoySelector.insertAdjacentHTML(
        "beforeend",
        `
            <option value='${category.category.name}'>${category.category.name}</option>
          `
      );
    }
  }

  // Metodo con el que mostraremos el formulario para una nueva categoria
  showRemoveProductionForm(productions) {
    this.inicio.replaceChildren();
    this.central.replaceChildren();

    const container = document.createElement("div");
    container.id = "remove-production";

    container.insertAdjacentHTML("beforeend", `<h1>Eliminar Produccion</h1>`);

    container.insertAdjacentHTML(
      "beforeend",
      `
        <form name="fRemoveProdcution" role="form" id="fRemoveProdcution" novalidate>

        <div class="mb-2">
        <label for="inputfRemoveProduction" class="form-label">Seleccione Producciones</label>
        <select class="form-control-sm" id="inputfRemoveProduction" name="inputfRemoveProduction" size="7" multiple required>
        </select>
        <div class="invalid-feedback d-none">Seleccione una produccion .</div>
        <div class="valid-feedback">Correcto.</div>
        </div>

          <div class="mb-2">
              <button class="btn btn-secondary btn-sm" type="submit">Enviar</button>
              <button class="btn btn-danger btn-sm" type="reset">Cancelar</button>
          </div>
        </form>
    
        `
    );

    this.central.append(container);

    const prodcutionSelector = document.getElementById(
      "inputfRemoveProduction"
    );

    // Recorremos las categorias y las añadimos a nuestro selector de categorias
    for (const production of productions) {
      prodcutionSelector.insertAdjacentHTML(
        "beforeend",
        `
            <option value='${production.title}'>${production.title}</option>
          `
      );
    }
  }

  showRemoveProductionModal(done, error) {
    //obtenemos el elemento del dom e iniciamos el modal en boostrap
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Produccion eliminada";
    //obtenemos el elemento con la clase del contenedor del modal
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">Las producciones han sido eliminadas de manera correcta.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La produccion no existe en el manager.</div>'
      );
    }
    messageModal.show();
  }

  showRemoveCategoryModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Categoria eliminada";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">Las categorias han sido eliminadas de manera correcta.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoria no existe en el manager.</div>'
      );
    }
    messageModal.show();
  }

  
  showRemoveDirectorModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Director eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">El director ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El director no existe en el manager.</div>'
      );
    }
    messageModal.show();
  }


  showRemoveActorModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Actor eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">El actor ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El actor no existe en el manager.</div>'
      );
    }
    messageModal.show();
  }

  showAssignDirectorModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Director Asignado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">El director ha sido asignado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La produccion ya esta asignada al director.</div>'
      );
    }
    messageModal.show();
  }

  
  showAssignActorModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Actor Asignado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">El actor ha sido asignado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La produccion ya esta asignada al actor.</div>'
      );
    }
    messageModal.show();
  }


  showDesAssignActorModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Actor desasignado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">El actor ha sido desasignado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La produccion no esta asignada al actor.</div>'
      );
    }
    messageModal.show();
  }

  showDesAssignDirectorModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Director Desasignado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">El director ha sido desasignado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La produccion no esta asignada al director.</div>'
      );
    }
    messageModal.show();
  }

  showNewCategoryModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Categoria creada";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">La categoria ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La categoria no ha podido crearse correctamente.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fCategory.reset();
      }
      document.fCategory.inputNamefCategory.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewActorModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Actor creado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">El actor ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El actor no ha podido crearse correctamente.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fActor.reset();
      }
      document.fActor.inputNamefActor.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewDirectorModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Director creado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">El director ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El director no ha podido crearse correctamente.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fDirector.reset();
      }
      document.fDirector.inputNamefDirector.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewProductionModal(done, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Produccion creada";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3 text-black">La produccion ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El produccion no ha podido crearse correctamente. ${error}</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fProdcution.reset();
      }
      document.fProdcution.inputNamefProduction.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  // Manejador para la validacion de formularios
  bindFormMenu = (
    newCategory,
    newActor,
    newDirector,
    newProduction,
    removeProduction,
    removeCategory,
    removeDirector,
    removeActor,
    assignDirector,
    desassignDirector,
    assignActor,
    desassignActor
  ) => {
    // Nueva categoria
    const newCategoryBind = document.getElementById("navFormCate");
    newCategoryBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        newCategory,
        [],
        "#new-category",
        { action: "newCategory" },
        "#",
        event
      );
    });

    const newActorBind = document.getElementById("navFormActor");
    newActorBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        newActor,
        [],
        "#new-actor",
        { action: "newActor" },
        "#",
        event
      );
    });

    const newDirectorBind = document.getElementById("navFormDirector");
    newDirectorBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        newDirector,
        [],
        "#new-director",
        { action: "newDirector" },
        "#",
        event
      );
    });

    const newProductionBind = document.getElementById("navFormProduction");
    newProductionBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        newProduction,
        [],
        "#new-production",
        { action: "newProduction" },
        "#",
        event
      );
    });

    const removeProductionBind = document.getElementById(
      "navFormRemoveProduction"
    );
    removeProductionBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        removeProduction,
        [],
        "#remove-production",
        { action: "removeProduction" },
        "#",
        event
      );
    });

    const removeCategoryBind = document.getElementById(
      "navFormRemoveCategory"
    );
    removeCategoryBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        removeCategory,
        [],
        "#remove-category",
        { action: "removeCategory" },
        "#",
        event
      );
    });

    const removeDirectorBind = document.getElementById(
      "navFormRemoveDirector"
    );
    removeDirectorBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        removeDirector,
        [],
        "#remove-director",
        { action: "removeDirector" },
        "#",
        event
      );
    });


    const removeActorBind = document.getElementById(
      "navFormRemoveActor"
    );
    removeActorBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        removeActor,
        [],
        "#remove-actor",
        { action: "removeActor" },
        "#",
        event
      );
    });

    const assignDirectorBind = document.getElementById(
      "navFormAssginDirector"
    );
    assignDirectorBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        assignDirector,
        [],
        "#assing-director",
        { action: "assignDirector" },
        "#",
        event
      );
    });


    const desassignDirectorBind = document.getElementById(
      "navFormDesAssginDirector"
    );
    desassignDirectorBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        desassignDirector,
        [],
        "#desassing-director",
        { action: "desassignDirector" },
        "#",
        event
      );
    });

    const assignActorBind = document.getElementById(
      "navFormAssignActor"
    );
    assignActorBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        assignActor,
        [],
        "#assign-actor",
        { action: "assignActor" },
        "#",
        event
      );
    });

    const desassignActorBind = document.getElementById(
      "navFormDesAssignActor"
    );
    desassignActorBind.addEventListener("click", (event) => {
      this[EXECUTE_HANDLER](
        desassignActor,
        [],
        "#desassign-actor",
        { action: "desassignActor" },
        "#",
        event
      );
    });
  };

  bindCategoryForm(handler) {
    newfCategory(handler);
  }

  bindActorForm(handler) {
    newfActor(handler);
  }

  bindDirectorForm(handler) {
    newfDirector(handler);
  }

  bindProductionForm(handler) {
    newfProduction(handler);
  }

  bindRemoveProductionForm(handler) {
    newfRemoveProduction(handler);
  }

  bindRemoveCategoryForm(handler) {
    newfRemoveCategory(handler);
  }

  bindRemoveDirectorForm(handler) {
    newfRemoveDirector(handler)
  }

  bindRemoveActorForm(handler) {
    newfRemoveActor(handler);
  }

  bindAssingDirectorform(handler) {
    newfAssingDirector(handler);
  }

  bindDesAssingDirectorform(handler) {
    newfDesAssingDirector(handler);
  }

  bindAssingActorForm(handler) {
    newfAssingActor(handler);
  }

  bindDesAssingActorForm(handler) {
    newfdesAssingActor(handler);
  }


  // Manejador para la tab de cierre de las ventanas
  bindCloseInNav(handler) {
    // Recogemos el boton
    const closeButton = document.getElementById("closeButton");
    // Aniadimos el evento al boton
    closeButton.addEventListener("click", (event) => {
      for (const [key, value] of this.productionsOpen) {
        handler(key, value);
      }
    });
  }

  // Binds
  // Manejador para cuando hagamos click en alguna categoria
  bindProdcutionCategory(handler) {
    // Obtenemos la categoria donde hacemos click
    const category = document.getElementById("category-list");

    // Obtenemos el link donde hacemos cliclk
    const categoryLinks = category.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const categoryLink of categoryLinks) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      categoryLink.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;

        this[EXECUTE_HANDLER](
          handler,
          [category],
          "#category-list",
          { action: "prodcutionCategory", category },
          "#category-list",
          event
        );
      });
    }
  }

  // Manejador para cuando hagamos click en alguna categoria
  bindProdcutionCategoryInNav(handler) {
    // Obtenemos la categoria donde hacemos click
    const category = document.getElementById("navCategories");

    // Obtenemos el link donde hacemos cliclk
    const categoryLinks = category.nextElementSibling.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const categoryLink of categoryLinks) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      categoryLink.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;

        this[EXECUTE_HANDLER](
          handler,
          [category],
          "#category-list",
          { action: "prodcutionCategoryInNav", category },
          "#category-list",
          event
        );
      });
    }
  }

  // Manejador para cuando hagamos click en alguna categoria
  bindShowProduction(handler) {
    // Obtenemos la categoria donde hacemos click
    const prod = document.getElementById("production-list");

    // Obtenemos el link donde hacemos cliclk
    const prodLinks = prod.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const pro of prodLinks) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      pro.addEventListener("click", (event) => {
        const { production } = event.currentTarget.dataset;

        this[EXECUTE_HANDLER](
          handler,
          [production],
          "#production-list",
          { action: "showProduction", production },
          "#production-list",
          event
        );
      });
    }
  }

  // Manejador para las producciones random
  bindRandomProduction(handler) {
    // Obtenemos la categoria donde hacemos click
    const prod = document.getElementById("randomProduction-list");

    // Obtenemos el link donde hacemos cliclk
    const prodLinks = prod.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const pro of prodLinks) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      pro.addEventListener("click", (event) => {
        const { production } = event.currentTarget.dataset;

        this[EXECUTE_HANDLER](
          handler,
          [production],
          "#randomProduction-list",
          { action: "showRandomProduction", production },
          "#randomProduction-list",
          event
        );
      });
    }
  }

  bindDirectorInNav(handler) {
    // Obtenemos la categoria donde hacemos click
    const d = document.getElementById("navDirectors");

    // Obtenemos el link donde hacemos cliclk
    const directors = d.nextElementSibling.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const direc of directors) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      direc.addEventListener("click", (event) => {
        const { director } = event.currentTarget.dataset;

        this[EXECUTE_HANDLER](
          handler,
          [director],
          "#director-item",
          { action: "directorInNav", director },
          "#director-item",
          event
        );
      });
    }
  }

  bindActorInNav(handler) {
    // Obtenemos la categoria donde hacemos click
    const d = document.getElementById("navActores");

    // Obtenemos el link donde hacemos cliclk
    const actors = d.nextElementSibling.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const actor of actors) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      actor.addEventListener("click", (event) => {
        const { actor } = event.currentTarget.dataset;

        this[EXECUTE_HANDLER](
          handler,
          [actor],
          "#actor-item",
          { action: "actorInNav", actor },
          "#actor-item",
          event
        );
      });
    }
  }

  // Manejador para la apertura de la nueva ventana con la produccion
  bindShowProductionInNewWindow(handler) {
    // Obtenemos el boton
    const button = document.getElementById("produc-open");

    // Creamos el evento para el boton que hemos recogido anteriormente
    button.addEventListener("click", (event) => {
      // Recogemos el nombre de la produccion
      const { produc } = event.currentTarget.dataset;

      // recorremos el mapa en busca del titulo que recibimos
      let producWindow = this.productionsOpen.get(produc)
        ? this.productionsOpen.get(produc)
        : false;

      if (!producWindow.closed && producWindow !== false) {
        // Le hacemos focus a la ventana si esta se encuentra dentro de nuestra mapa y no esta cerrada
        producWindow.focus();
      } else {
        // Abrimos la nueva ventana
        let producNewWindow = window.open(
          "card.html",
          `Production Window ${this.contWindow++}`,
          "widht=500, height=500, top=500, left=500, tittlebar=yes"
        );

        // Aniadimos la ventana a nuestro mapa
        this.productionsOpen.set(produc, producNewWindow);

        // Aniadimos el evento correspondiente
        producNewWindow.addEventListener("DOMContentLoaded", (event) => {
          handler(produc, producNewWindow);
        });
      }
    });
  }
}

// Exportamos nuestra vista
export default StreamManagerView;
