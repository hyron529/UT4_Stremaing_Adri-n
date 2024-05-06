// Importamos los objetos necesarios para la creacion
import { Movie } from "./objects/movie.js";
import { Serie } from "./objects/serie.js";
import { Resource } from "./objects/resource.js";
import { Coordinate } from "./objects/coordinate.js"
import { Actor } from "./objects/actor.js";
import { Director } from "./objects/director.js";

// Definimos el modelo y la vista de nuestro controlador
const MODEL = Symbol('streamManagerModel');
const VIEW = Symbol('streamManagerView');

// Variable privada que usaremos para la carga de objetos
const LOAD_OBJECTS = Symbol('Load Object');

// Definimos nuestra clase controlador
class StreamManagerController {
    // Cremaos el constructo de nuestra clase y definimos el contenido de nuestras variables privadas
    constructor(model, view) {
        this[MODEL] = model;
        this[VIEW] = view;

        // Cargamos los eventos para el funcionamiento de nuestro programa
        this.onLoad();
        this.onInit();
        this[VIEW].bindInit(this.handleInit);
    }

    // Metodo donde cargamos el valor de nuestros objetos
    [LOAD_OBJECTS] () {
        // Creación de las categorías
        let terrorCategory = this[MODEL].createCategory("Terror");
        terrorCategory.description = "Películas y series de terror para los amantes del género.";

        let dramaCategory = this[MODEL].createCategory("Drama");
        dramaCategory.description = "Películas y series dramáticas que te harán reflexionar.";

        let comedyCategory = this[MODEL].createCategory("Comedia");
        comedyCategory.description = "Películas y series que te sacarán una sonrisa.";

        let resource = new Resource("120", "aaaaaa");
        let coordinate = new Coordinate(60, 64);

        // Añadimos las producciones
        let sawMovie = new Movie("Saw X", "USA", "20/01/2023", "John tortura a los que le estafaron por el cáncer.", "/img/saw.jpeg", coordinate, resource);
        let conjuringMovie = new Movie("El Conjuro", "USA", "15/07/2022", "Una pareja investiga fenómenos paranormales en una casa encantada.", "/img/conjuro.webp", coordinate, resource);
        let strangerThings = new Serie("Stranger Things", "USA", "15/07/2016", "Un grupo de niños enfrenta criaturas sobrenaturales en los años 80.", "/img/demogorgon.webp", coordinate, resource, "2");        
        let exorcistSerie = new Serie("El Exorcista", "USA", "23/09/2016", "Un sacerdote lucha contra posesiones demoníacas.", "/img/exorcista.jpg", coordinate, resource, "2");
        let shawshankMovie = new Movie("Cadena Perpetua", "USA", "14/10/1994", "Un hombre inocente lucha por su libertad en una prisión corrupta.", "/img/cadena.jpg", coordinate, resource);
        let breakingBad = new Serie("Breaking Bad", "USA", "20/01/2008", "Un profesor de química se convierte en un poderoso narcotraficante.", "/img/walter.jpg", coordinate, resource, "2");
        let forrestGump = new Movie("Forrest Gump", "USA", "06/07/1994", "La historia de un hombre con discapacidad que vive momentos clave de la historia de Estados Unidos.", "/img/forrest.jpg", coordinate, resource);
        let thisIsUs = new Serie("This Is Us", "USA", "20/09/2016", "Las vidas entrelazadas de varias personas nacidas en el mismo día.", "/img/thisisus.jpeg", coordinate, resource, "2");
        let superbadMovie = new Movie("Superbad", "USA", "17/08/2007", "Dos amigos intentan conseguir alcohol para una fiesta.", "/img/superbad.jpg", coordinate, resource);
        let brooklyn99 = new Serie("Brooklyn Nine-Nine", "USA", "17/09/2013", "La vida de detectives en una comisaría de Nueva York.", "/img/brooklyn.jpg", coordinate, resource, "2");
        let theOffice = new Serie("The Office", "USA", "24/03/2005", "El día a día de los empleados de una oficina en Scranton.", "/img/office.jpg", coordinate, resource, "2");
        let hangoverMovie = new Movie("Resacon en Las Vegas", "USA", "05/06/2009", "Un grupo de amigos despierta después de una noche de desenfreno sin recordar nada.", "/img/resacon.png", coordinate, resource);

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
        director.picture ="/img/nolan.jpg";


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
    }

    onInit = () => {
        this[VIEW].showCategories(this[MODEL].categories);
        this[VIEW].bindProdcutionCategory(this.handleProdcutionCategory);
        this[VIEW].showRandomProductions(this[MODEL].getRandomProductions());
        this[VIEW].bindRandomProduction(this.handleRandomProduction);
    }

    // Handlers
    handleInit = () => {
        this.onInit();
    }

    // Manejador para mostrar la informacion de una produccion
    handleShowProduction = (name) => {
        const production = this[MODEL].createProduction(name);
        this[VIEW].showProduction(production);
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

}

// Exportamos nuestra clase
export default StreamManagerController;