// Importamos los objetos necesarios para la creacion
import { Movie } from "./objects/movie.js";
import { Serie } from "./objects/serie.js";
import { Resource } from "./objects/resource.js";
import { Coordinate } from "./objects/coordinate.js"
import { Actor } from "./objects/actor.js";
import { Director } from "./objects/director.js";

//importacion de get cookie para mostrar el mensaje al usuario
import { getCookie } from "./util.js";

// Definimos el modelo y la vista de nuestro controlador
const MODEL = Symbol('streamManagerModel');
const VIEW = Symbol('streamManagerView');
//declaramos los campos para autenticar y su usuario
const AUTH = Symbol('AUTH');
const USER = Symbol('User');

// Variable privada que usaremos para la carga de objetos
const LOAD_OBJECTS = Symbol('Load Object');

// Definimos nuestra clase controlador
class StreamManagerController {
    // Cremaos el constructo de nuestra clase y definimos el contenido de nuestras variables privadas
    constructor(model, view, authentication) {
        this[MODEL] = model;
        this[VIEW] = view;
        //realizamos el servicio de autenticacion
        this[AUTH] = authentication;
        this[USER] = null;

        // Cargamos los eventos para el funcionamiento de nuestro programa
        this.onLoad();
        this.onInit();
        this[VIEW].bindInit(this.handleInit);
    }

    // Metodo donde cargamos el valor de nuestros objetos
    [LOAD_OBJECTS]() {
        // Creación de las categorías
        let terrorCategory = this[MODEL].createCategory("Terror");
        terrorCategory.description = "Películas y series de terror para los amantes del género.";

        let dramaCategory = this[MODEL].createCategory("Drama");
        dramaCategory.description = "Películas y series dramáticas que te harán reflexionar.";

        let comedyCategory = this[MODEL].createCategory("Comedia");
        comedyCategory.description = "Películas y series que te sacarán una sonrisa.";


        // Añadimos las producciones
        let sawMovie = new Movie("Saw X", "USA", "20/01/2023", "John tortura a los que le estafaron por el cáncer.", "/img/saw.jpeg");
        let conjuringMovie = new Movie("El Conjuro", "USA", "15/07/2022", "Una pareja investiga fenómenos paranormales en una casa encantada.", "/img/conjuro.webp");
        let strangerThings = new Serie("Stranger Things", "USA", "15/07/2016", "Un grupo de niños enfrenta criaturas sobrenaturales en los años 80.", "/img/demogorgon.webp", "2");
        let exorcistSerie = new Serie("El Exorcista", "USA", "23/09/2016", "Un sacerdote lucha contra posesiones demoníacas.", "/img/exorcista.jpg", "2");
        let shawshankMovie = new Movie("Cadena Perpetua", "USA", "14/10/1994", "Un hombre inocente lucha por su libertad en una prisión corrupta.", "/img/cadena.jpg");
        let breakingBad = new Serie("Breaking Bad", "USA", "20/01/2008", "Un profesor de química se convierte en un poderoso narcotraficante.", "/img/walter.jpg", "2");
        let forrestGump = new Movie("Forrest Gump", "USA", "06/07/1994", "La historia de un hombre con discapacidad que vive momentos clave de la historia de Estados Unidos.", "/img/forrest.jpg");
        let thisIsUs = new Serie("This Is Us", "USA", "20/09/2016", "Las vidas entrelazadas de varias personas nacidas en el mismo día.", "/img/thisisus.jpeg", "2");
        let superbadMovie = new Movie("Superbad", "USA", "17/08/2007", "Dos amigos intentan conseguir alcohol para una fiesta.", "/img/superbad.jpg");
        let brooklyn99 = new Serie("Brooklyn Nine-Nine", "USA", "17/09/2013", "La vida de detectives en una comisaría de Nueva York.", "/img/brooklyn.jpg", "2");
        let theOffice = new Serie("The Office", "USA", "24/03/2005", "El día a día de los empleados de una oficina en Scranton.", "/img/office.jpg", "2");
        let hangoverMovie = new Movie("Resacon en Las Vegas", "USA", "05/06/2009", "Un grupo de amigos despierta después de una noche de desenfreno sin recordar nada.", "/img/resacon.png");

        // Asingamos las producciones a las categorias
        this[MODEL].assignCategory(terrorCategory, sawMovie, conjuringMovie, strangerThings, exorcistSerie);
        this[MODEL].assignCategory(dramaCategory, shawshankMovie, breakingBad, forrestGump, thisIsUs);
        this[MODEL].assignCategory(comedyCategory, superbadMovie, brooklyn99, theOffice, hangoverMovie);

        let actor1 = new Actor("Johnny");
        actor1.lastname1 = "Depp";
        actor1.born = "20/08/1960";
        actor1.picture = "/img/deep.webp";

        let actor2 = new Actor("Tom");
        actor2.lastname1 = "Hanks";
        actor2.born = "20/08/1960";
        actor2.picture = "/img/hanks.jpeg";

        // Creación de un director
        let director = new Director("Christopher");
        director.lastname1 = "Nolan";
        director.born = "30/07/1970";
        director.picture = "/img/nolan.jpg";


        this[MODEL].assignActor(actor1, sawMovie, conjuringMovie, strangerThings, exorcistSerie, breakingBad);

        this[MODEL].assignActor(actor2, shawshankMovie, forrestGump, thisIsUs);
        this[MODEL].assignActor(actor2, superbadMovie, brooklyn99, theOffice, hangoverMovie);


        this[MODEL].assignDirector(director, shawshankMovie, breakingBad, forrestGump, thisIsUs);
    }

    // Metodo en el que cargaremos los metodos necesariaas para el funcionamiento de la aplicacion
    onLoad = () => {
        this[LOAD_OBJECTS]();
        this.menuItemCategory();
        this.menuItemActor();
        this.menuItemDirector();
        this.menuItemCloseWindow();
        this[VIEW].showFormMenu();
        this[VIEW].bindFormMenu(
            this.handlefCategory,
            this.handlefActor,
            this.handlefDirector,
            this.handlefProduction,
            this.handlefRemoveProduction,
            this.handlefRemoveCategory,
            this.handlefRemoveDirector,
            this.handlefRemoveActor,
            this.handlefAssingDirector,
            this.handlefDesAssingDirector,
            this.handlefAssingActor,
            this.handlefDesAssingActor
        );

        /*
        
        
        Cookies
        
        */
        // Vamos a comprobar si se ha aceptado el mensaje de la cookie
        // si no se acepto se lo mostraremos al usuario desde nuestra vista
        if (getCookie('acceptedCookieMessage') !== 'true') {
            //Funcion en la vista para mostrar el mensaje de la cookie
            this[VIEW].showCookiesMessage();
        }

        // Vamos a proceder con el login de usuarios, usaremos una cookie para que en caso
        // de que el usuario se loguee la primera vez y pulse el recuerdame
        // no tenga que volver a realizarlo cada vez que entre a nuestra pagina
        // Obtenemos si hay una cookie de usuario guardada
        const userCookie = getCookie('activeUser');

        // Si existe la cookie
        if (userCookie) {
            // Recogemos el usuario que contiene la cookie
            const user = this[AUTH].getUser(userCookie);

            // Si existe el usuario abrimos la sesion
            if (user) {
                this[USER] = user;
                this.onOpenSession();
            }
        } else {
            // Mostramos el link de identificame
            this[VIEW].showIdentificationLink();
            this[VIEW].bindIdentificationLink(this.handleLoginForm);

            // Cerramos la sesion del usuario si hay ninguna cookie activa
            this.onCloseSession();
        }
    }

    onInit = () => {
        this[VIEW].showCategories(this[MODEL].categories);
        this[VIEW].bindProdcutionCategory(this.handleProdcutionCategory);
        this[VIEW].showRandomProductions(this[MODEL].getRandomProductions());
        this[VIEW].bindRandomProduction(this.handleRandomProduction);
    }

    /*
        
        Cookies
        
    */

    // Manejador para mostrar las producciones
    handleShowProduction = (name) => {
        const production = this[MODEL].createProduction(name);
        this[VIEW].showProduction(production);
        this[VIEW].bindShowProductionInNewWindow(this.handleProductionInNewWindow);
        this[VIEW].bindAddProductionToFav(this.handleAddProductionToFav);
    }

    // Metodo con el que mostraremos las acciones necesarias
    // cuando el usuario este regsitrado, mostrando por ejemplo el menu de administacion
    onOpenSession() {
        this.onInit();
        // Llamamos al metodo de nuestra vista que cambia la accion de inicio de nuestro history
        this[VIEW].initHistory();
        // Mostramos la vista que muestra el perfil del usuario
        this[VIEW].showAuthUserProfile(this[USER]);
        // Mostramos el menu de administracion si el usuario esta registrado
        // Añadimos la opcion de consultar la lista de favoritos
        this[VIEW].showProductionFavMenu();
        this[VIEW].bindProductionFav(this.handleProductionFav);
        this[VIEW].showAdminMenu();  // Menu de administracion
        this[VIEW].bindAdminMenu(
            this.handleNewDishForm,
            this.handleRemoveDishForm,
            this.handleAssingDishForm,
            this.handlDesssingDishForm,
            this.handleMoveDishForm,
            this.handleNewCategoryForm,
            this.handleNewRestaurantForm,
            this.handleRemoveCategoryForm
        );
        // Funcionalidad del enlace de cerrar sesion
        this[VIEW].bindCloseSession(this.handleCloseSession);
    }

    // Creamos un manejador para que nos permita abir el formulario de registro
    // y asi mismo tambien le dotaremos con us respectiva funcionalidad
    handleLoginForm = () => {
        this[VIEW].showLogin();
        this[VIEW].bindLogin(this.handleLogin);
    }

    // Creamos el manejador que nos va a realizar la validacion de los datos
    // que introduce el usuario al loguearse en nuestro sistema
    // recibimos por parametro la contraseña, el nombre de usuario y si ha pulsado el boton de recuerdame
    handleLogin = (username, password, remember) => {
        if (this[AUTH].validateUser(username, password)) {
            // Obtenemos el usuario y abrimos la sesion
            this[USER] = this[AUTH].getUser(username);
            this.onOpenSession();

            // Si la sesion ha sido correcta y el ususario selecciono el recuerdame guardamos la cookie
            if (remember) {
                this[VIEW].setUserCookie(this[USER]);
            }
        } else {
            // Mostramos el mensaje de que el login ha sido invalido
            this[VIEW].showInvalidUserMessage();
        }
    }
}

// Creamos el manejador con el que cerraremos la sesion del usuario
// Este se activara cuando se pulse sobre el enlace de cerrar sesion
handleCloseSession = () => {
    this.onCloseSession();
    this.onInit();
    this[VIEW].initHistory();
};

//manejador para añadir las prods favoritas del usuario
handleAddProductionToFav = (nameProduction) => {
    let done;
    let err;

    //si existe un usuario registrado, añadimos la prodduccion fav
    if (this[USER]) {

        //si existe un localStorage obtenemos las producciones
        if (localStorage.getItem("favProductions")) {
            this[PRODUCTIONFAV] = JSON.parse(localStorage.getItem("favProductions"));
        }

        //mostramos error si el array ya contiene la produccion
        if (this[PRODUCTIONFAV].includes(nameProduction)) {
            //indicamos que no se ha realizado correctamente
            done = false;
        } else {
            // Añadimos la produccion al array
            this[PRODUCTIONFAV].push(nameProduction);
            //añadimos al localStorage el array con las producciones favoritas
            localStorage.setItem("favProductions", JSON.stringify(this[PRODUCTIONFAV]));
            //indicamos que se ha realizado correctamente
            done = true;
        }

        //modal para mostrar que esa produccion se ha añadido
        this[VIEW].showFavProductionModal(done, dishName, err);
    } else {
        //modal de error en caso de no estar registrado
        this[VIEW].showNeedsLogin();
    }
}


//manejador de eventos para mostrar las producciones favoritas en el localstorage
handleProductionFav = () => {

    //se obtienen las prods que hay en el localstorage
    const prodStorage = JSON.parse(localStorage.getItem("favProductions"));

    //array para guardar los platos a almacenar
    const productions = [];

    //Recorremos las prods que tenemos almacenadas
    for (const p of prodStorage) {
        //Obtenemos las producciones
        const production = this[MODEL].createProduction(p);
        //Metemos las producciones en el array
        dishes.push(production);
    }

    //Mostramos al usuario desde la vista todas las produccioens que tiene como favoritas
    this[VIEW].listProductions(
        productions,
        "Producciones favoritas"
    );
    this[VIEW].bindShowProduction(this.handleShowProduction);
}

// Handlers
handleInit = () => {
    this.onInit();
}

// Manejadores de formularios
handlefCategory = () => {
    this[VIEW].showCategoryForm();
    this[VIEW].bindCategoryForm(this.handleCreateCategory);
}

handlefActor = () => {
    this[VIEW].showActorForm();
    this[VIEW].bindActorForm(this.handleCreateActor);
}

handlefDirector = () => {
    this[VIEW].showDirectorForm();
    this[VIEW].bindDirectorForm(this.handleCreateDirector);
}

handlefProduction = () => {
    this[VIEW].showProductionForm(this[MODEL].categories, this[MODEL].directors);
    this[VIEW].bindProductionForm(this.handleCreateProduction);
}

handlefRemoveProduction = () => {
    this[VIEW].showRemoveProductionForm(this[MODEL].productions);
    this[VIEW].bindRemoveProductionForm(this.handleRemoveProduction);
}

handlefRemoveCategory = () => {
    this[VIEW].showRemoveCategory(this[MODEL].categories);
    this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
}

handlefRemoveDirector = () => {
    this[VIEW].showRemoveDirector(this[MODEL].directors);
    this[VIEW].bindRemoveDirectorForm(this.handleRemoveDirector);
}

handlefRemoveActor = () => {
    this[VIEW].showRemoveActor(this[MODEL].actors);
    this[VIEW].bindRemoveActorForm(this.handleRemoveActor);
}

handlefAssingDirector = () => {
    this[VIEW].showAssignDirector(this[MODEL].directors, this[MODEL].productions);
    this[VIEW].bindAssingDirectorform(this.handleAssingDirector);
}

handlefDesAssingDirector = () => {
    this[VIEW].showDesAssignDirector(this[MODEL].directors, this[MODEL].productions);
    this[VIEW].bindDesAssingDirectorform(this.handleDesAssingDirector);
}

handlefAssingActor = () => {
    this[VIEW].showAssignActor(this[MODEL].actors, this[MODEL].productions);
    this[VIEW].bindAssingActorForm(this.handleAssignActor);
}

handlefDesAssingActor = () => {
    this[VIEW].showDesAssignActor(this[MODEL].actors, this[MODEL].productions);
    this[VIEW].bindDesAssingActorForm(this.handledesAssignActor);
}

handleCreateCategory = (name, description) => {
    const category = this[MODEL].createCategory(name);

    if (description) category.description = description;

    let done;
    let error;

    try {
        this[MODEL].addCategory(category);
        this.menuItemCategory();
        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showNewCategoryModal(done, error);
}

handleCreateActor = (name, lastname1, lastname2, born, picture) => {
    // Recogemos la categoria
    const act = this[MODEL].createActor(name);

    if (lastname1) act.lastname1 = lastname1;
    if (lastname2) act.lastname2 = lastname2;
    if (born) act.born = born;
    if (picture) act.picture = picture;

    let done;
    let error;

    try {
        this[MODEL].addActor(act);
        this.menuItemActor();
        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showNewActorModal(done, error);
}

handleCreateDirector = (name, lastname1, lastname2, born, picture) => {
    // Recogemos la categoria
    const director = this[MODEL].createDirector(name);

    if (lastname1) director.lastname1 = lastname1;
    if (lastname2) director.lastname2 = lastname2;
    if (born) director.born = born;
    if (picture) director.picture = picture;

    let done;
    let error;

    try {
        this[MODEL].addDirector(director);
        this.menuItemDirector();
        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showNewDirectorModal(done, error);
}

handleCreateProduction = (name, type, nationality, publication, synopsis, image, sesason, categories, directors) => {
    const production = this[MODEL].createProduction(name, type);

    if (nationality) production.nationality = nationality;
    if (publication) production.publication = publication;
    if (synopsis) production.synopsis = synopsis;
    if (image) production.image = image;

    if (type === "serie") {
        if (sesason) production.seasons = sesason;
    }

    let done;
    let error;

    try {

        categories.forEach((name) => {
            const category = this[MODEL].createCategory(name);
            // Asignamos la categoria
            this[MODEL].assignCategory(category, production);
        })

        this[MODEL].addProduction(production);


        directors.forEach((name) => {
            const director = this[MODEL].createDirector(name);
            this[MODEL].assignDirector(director, production);
        });

        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showNewProductionModal(done, error);
}


handleRemoveProduction = (productions) => {

    let done;
    let error;

    try {
        productions.forEach((name) => {
            const production = this[MODEL].createProduction(name);
            // Asignamos la categoria
            this[MODEL].removeProduction(production);
        })

        //Recargamos los recursos
        this.handlefRemoveProduction();
        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showRemoveProductionModal(done, error);
}


handleRemoveCategory = (categories) => {

    let done;
    let error;

    try {
        categories.forEach((name) => {
            const category = this[MODEL].createCategory(name);
            // Asignamos la categoria
            this[MODEL].removeCategory(category);
        })

        //Recargamos los recursos
        this.handlefRemoveCategory();
        this.menuItemCategory();
        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showRemoveCategoryModal(done, error);
}

handleRemoveDirector = (directors) => {

    let done;
    let error;

    try {
        directors.forEach((name) => {
            const direc = this[MODEL].createDirector(name);
            // Asignamos la categoria
            this[MODEL].removeDirector(direc);
        })

        //Recargamos los recursos
        this.handlefRemoveDirector();
        this.menuItemDirector();
        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showNewDirectorModal(done, error);
}

handleRemoveActor = (actors) => {

    let done;
    let error;

    try {
        actors.forEach((name) => {
            const act = this[MODEL].createActor(name);
            // Asignamos la categoria
            this[MODEL].removeActor(act);
        })

        //Recargamos los recursos
        this.handlefRemoveActor();
        this.menuItemActor();
        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showRemoveActorModal(done, error);
}

handleAssingDirector = (directors, productions) => {
    let done;
    let error;

    try {
        directors.forEach((name) => {
            const direc = this[MODEL].createDirector(name);

            productions.forEach((name) => {
                const prod = this[MODEL].createProduction(name);

                this[MODEL].assignDirector(direc, prod);
            })
        })

        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showAssignDirectorModal(done, error);
}



handleDesAssingDirector = (directors, productions) => {
    let done;
    let error;

    try {
        directors.forEach((name) => {
            const direc = this[MODEL].createDirector(name);

            productions.forEach((name) => {
                const prod = this[MODEL].createProduction(name);

                this[MODEL].deassignDirector(direc, prod);
            })
        })

        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showDesAssignDirectorModal(done, error);
}

handleAssignActor = (actors, productions) => {
    let done;
    let error;

    try {
        actors.forEach((name) => {
            const act = this[MODEL].createActor(name);

            productions.forEach((name) => {
                const prod = this[MODEL].createProduction(name);

                this[MODEL].assignActor(act, prod);
            })
        })

        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showAssignActorModal(done, error);
}


handledesAssignActor = (actors, productions) => {
    let done;
    let error;

    try {
        actors.forEach((name) => {
            const act = this[MODEL].createActor(name);

            productions.forEach((name) => {
                const prod = this[MODEL].createProduction(name);

                this[MODEL].deassignActor(act, prod);
            })
        })

        done = true;
    } catch (exeception) {
        done = false;
        error = exeception;
    }

    this[VIEW].showDesAssignActorModal(done, error);
}

// Manejador para mostrar la informacion de una produccion
handleShowProduction = (name) => {
    const production = this[MODEL].createProduction(name);
    this[VIEW].showProduction(production);
    this[VIEW].bindShowProductionInNewWindow(this.handleProductionWindow);
}

// Manejador para las producciones en nuevas ventanas
handleProductionWindow = (name, window) => {
    const production = this[MODEL].createProduction(name);
    this[VIEW].showProductionInNewWindow(production, window);
}

// Manejador para las producciones random
handleRandomProduction = (name) => {
    const production = this[MODEL].createProduction(name);
    this.handleShowProduction(production.title);
}

// Manejador para mostrar las producciones de una categoria en concreto
handleProdcutionCategory = (name) => {
    // Recogemos la categoria
    const category = this[MODEL].createCategory(name);

    // Metodo con el que listaremos las producciones
    this[VIEW].showProductionList(
        this[MODEL].getProductionsCategory(category),
        name
    );

    this[VIEW].bindShowProduction(this.handleShowProduction);
}

// Manejador para mostrar las producciones de una categoria en concreto
handleProdcutionDirector = (name) => {
    // Recogemos la categoria
    const director = this[MODEL].createDirector(name);

    // Metodo con el que listaremos las producciones
    this[VIEW].showProductionList(
        this[MODEL].getProductionsDirector(director),
        name
    );

    this[VIEW].bindShowProduction(this.handleShowProduction);
    this[VIEW].showDirector(director);
}

// Manejador para mostrar las producciones de una categoria en concreto
handleProdcutionActor = (name) => {
    // Recogemos la categoria
    const act = this[MODEL].createActor(name);

    // Metodo con el que listaremos las producciones
    this[VIEW].showProductionList(
        this[MODEL].getProductionsActor(act),
        name
    );

    this[VIEW].bindShowProduction(this.handleShowProduction);
    this[VIEW].showActor(act);
}

// Manejador con el que cerraremos y borrares de nuestro mapa todas las ventanas
handleCloseWindow = (production, window) => {
    window.close();
    this[VIEW].productionsOpen.delete(production);
}

// Metodo con el que cargamos las categorias al menu
menuItemCategory = () => {
    this[VIEW].showCategoriesInNav(this[MODEL].categories);
    this[VIEW].bindProdcutionCategoryInNav(this.handleProdcutionCategory);
}

// Metodo con el que cargamos los actores al menu
menuItemActor = () => {
    this[VIEW].showActorsInNav(this[MODEL].actors);
    this[VIEW].bindActorInNav(this.handleProdcutionActor);
}

// Metodo con el que cargamos los directores al menu
menuItemDirector = () => {
    this[VIEW].showDirectorsInNav(this[MODEL].directors);
    this[VIEW].bindDirectorInNav(this.handleProdcutionDirector);
}

// Metodo con el que cargamos el boton de borrar de nuestro nav
menuItemCloseWindow = () => {
    this[VIEW].showCloseInNav();
    this[VIEW].bindCloseInNav(this.handleCloseWindow)
}


// Exportamos nuestra clase
export default StreamManagerController;