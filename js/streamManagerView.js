
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
      this[EXECUTE_HANDLER](handler, [], "body", { action: "inicio" }, "#", event);
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
                <div class="card rounded-3 mt-20">
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
    // Nos creamos el li de las categorias y le aniadimos las respectivas clases de boostrap
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");

    // Le aniadimos el titulo a nuestro contenedor
    li.insertAdjacentHTML(
      "beforeend",
      '<a class="nav-link dropdown-toggle" href="#" id="navCategories" role="button" data-bs-toggle="dropdown" aria-expanded="false">CATEGORIAS</a>'
    );

    // Nos creamos el ul que ira dentro de nuestr dropdown y le aniadimos las respectivas clases de boostrap
    const ul = document.createElement("ul");
    ul.classList.add("dropdown-menu");

    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const category of categories) {
      ul.insertAdjacentHTML(
        "beforeend",
        `
                <li>
                    <a data-category="${category.category.name}"
                    class="dropdown-item" 
                    href="#"> 
                        ${category.category.name}
                    </a>
                </li>
                `
      );
    }

    li.append(ul);
    // Aniadimos el li al menu
    this.menu.append(li);
  }

  // Metodo con el que mostraremos las actores que tenemos disponibles en la zona del menu
  showActorsInNav(actors) {
    // Nos creamos el li de las categorias y le aniadimos las respectivas clases de boostrap
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");

    // Le aniadimos el titulo a nuestro contenedor
    li.insertAdjacentHTML(
      "beforeend",
      '<a class="nav-link dropdown-toggle" href="#" id="navActores" role="button" data-bs-toggle="dropdown" aria-expanded="false">ACTORES</a>'
    );

    // Nos creamos el ul que ira dentro de nuestr dropdown y le aniadimos las respectivas clases de boostrap
    const ul = document.createElement("ul");
    ul.classList.add("dropdown-menu");

    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const actor of actors) {
      ul.insertAdjacentHTML(
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

    li.append(ul);
    // Aniadimos el li al menu
    this.menu.append(li);
  }

  // Metodo con el que mostraremos las actores que tenemos disponibles en la zona del menu
  showDirectorsInNav(directors) {
    // Nos creamos el li de las categorias y le aniadimos las respectivas clases de boostrap
    const li = document.createElement("li");
    li.classList.add("nav-item", "dropdown");

    // Le aniadimos el titulo a nuestro contenedor
    li.insertAdjacentHTML(
      "beforeend",
      '<a class="nav-link dropdown-toggle" href="#" id="navDirector" role="button" data-bs-toggle="dropdown" aria-expanded="false">DIRECTORES</a>'
    );

    // Nos creamos el ul que ira dentro de nuestr dropdown y le aniadimos las respectivas clases de boostrap
    const ul = document.createElement("ul");
    ul.classList.add("dropdown-menu");

    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const director of directors) {
      console.log(director);
      ul.insertAdjacentHTML(
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

    li.append(ul);
    // Aniadimos el li al menu
    this.menu.append(li);
  }

  // Metodo con el que mostraremos las categorias que tenemos disponibles en la zona central
  showRandomProductions(productions) {
    if (this.inicio.children.length > 0) this.inicio.children[0].remove();

    // Nos creamos el contenedor de las categorias y le aniadimos las respectivas clases de boostrap
    const container = document.createElement("div");
    container.classList.add("row");
    container.id = "randomProduction-list";

    // Le aniadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML("beforeend", "<h1>Producciones Random</h1>");

    // Iteramos sobre las categorias que recibimos y las aniadimos a nuestro contenedor
    for (const pro of productions) {
      container.insertAdjacentHTML(
        "beforeend",
        `
                <div class="card rounded-3 mt-20">
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
                    <div class="card rounded-3 mt-20">
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
                <img src=${production.image} class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${production.title}</h5>
                    <p class="card-text">${production.synopsis}</p>
                    <h3 class="card-title">publications</h3>
                    <p class="card-text">${production.publication}</p>
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
                    <h5 class="card-title">${act.name}</h5>
                    <p class="card-text">${act.lastname1}</p>
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
                        <h5 class="card-title">${director.name}</h5>
                        <p class="card-text">${director.lastname1}</p>
                    </div>
                    `
      );
    }

    // Aniadimos el container a la zona central
    this.central.append(container);
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
       
        this[EXECUTE_HANDLER](handler, [category], "#category-list", { action: "prodcutionCategory", category }, "#category-list", event);
      });
    }
  }

  // Manejador para cuando hagamos click en alguna categoria
  bindProdcutionCategoryInNav(handler) {
    // Obtenemos la categoria donde hacemos click
    const category = document.getElementById("navCategories");

    // Obtenemos el link donde hacemos cliclk
    const categoryLinks = category.nextSibling.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const categoryLink of categoryLinks) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      categoryLink.addEventListener("click", (event) => {
        const { category } = event.currentTarget.dataset;
       
        this[EXECUTE_HANDLER](handler, [category], "#category-list", { action: "prodcutionCategoryInNav", category }, "#category-list", event);
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

        this[EXECUTE_HANDLER](handler, [production], "#production-list", { action: "showProduction", production }, "#production-list", event);
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

        this[EXECUTE_HANDLER](handler, [production], "#randomProduction-list", { action: "showRandomProduction", production }, "#randomProduction-list", event);
      });
    }
  }

  bindDirectorInNav(handler) {
    // Obtenemos la categoria donde hacemos click
    const d = document.getElementById("navDirector");

    // Obtenemos el link donde hacemos cliclk
    const directors = d.nextSibling.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const direc of directors) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      direc.addEventListener("click", (event) => {
        const { director } = event.currentTarget.dataset;
      
        this[EXECUTE_HANDLER](handler, [director], "#director-item", { action: "directorInNav", director }, "#director-item", event);
      });
    }
  }

  bindActorInNav(handler) {
    // Obtenemos la categoria donde hacemos click
    const d = document.getElementById("navActores");

    // Obtenemos el link donde hacemos cliclk
    const actors = d.nextSibling.querySelectorAll("a");

    // Iteramos sobre los links para obtener el valor donde el usuario haga click
    for (const actor of actors) {
      // Le aniadimos un evento para cunado se haga click en el enlace obtener el nombre de la categoria donde se ha pulsado
      actor.addEventListener("click", (event) => {
        const { actor } = event.currentTarget.dataset;

        this[EXECUTE_HANDLER](handler, [actor], "#actor-item", { action: "actorInNav", actor }, "#actor-item", event);
      });
    }
  }
}

// Exportamos nuestra vista
export default StreamManagerView;
