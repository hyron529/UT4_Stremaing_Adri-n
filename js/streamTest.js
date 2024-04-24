//importamos las clases de todos los objetos y el manager

import {Category} from "../objects/category.js";
import { Person } from "../objects/person.js";
import {Resource} from "../objects/resource.js";
import {Coordinate} from "../objects/coordinate.js";
import {User} from "../objects/user.js";
import {Movie} from "../objects/movie.js";
import {Serie} from "../objects/serie.js";
import {Production} from "../objects/production.js";
import StreamManager from "../js/streamManager.js";

//función para testear objetos y métodos creados
function streamTest(){

    console.log("<<<<< CREACIÓN DE OBJETOS >>>>>");
    console.log(" ");

    //creación y muestra por consola de objetos
    let category = new Category("Terror");
    category.description = "Género de terror para +18.";
    console.log(category.toString());

    let person = new Person("Jack");
    person.lastname1 = "Nickolson";
    person.born = "10/02/1950";
    console.log(person.toString());

    let person2 = new Person("Steven");
    person2.lastname1 = "Spielberg";
    person2.born = "20/08/1960";
    console.log(person2.toString());

    let resource = new Resource("120", "aaaaaa");
    console.log(resource.toString());

    let coordinate = new Coordinate(60,64);
    console.log(coordinate.toString());

    let user = new User("Adrián", "Adrian@gmail.com", "adrianNN");
    console.log(user.toString());

    let movie = new Movie("Saw X", "USA", "20/01/2023", "John tortura a los que le estafaron por el cáncer.", "John.png", coordinate, resource);
    console.log(movie.toString());

    let serie = new Serie(resource, coordinate, "3", "30 monedas", "30monedas.com", "15/05/2021", "Lucha por conseguir las 30 monedas en un pueblo castellano.", "Moneda.png");
    console.log(serie.toString());

    //-------------------------------------------------------------------------------

    console.log(" ");
    console.log("<<<<< PRUEBAS CON MÉTODOS >>>>>");
    console.log(" ");

    //definimos la instancia 
    let instance = StreamManager.getInstance();

    //comprobación del método para añadir una categoria
    instance.addCategory(category);
    console.log(instance);

    //comprobación del método eliminar categoría
    instance.removeCategory(category);
    console.log(instance);

    //comprobación del método para añadir un usuario
    instance.addUser(user);
    console.log(instance);

    //comprobación del método eliminar usuario
    instance.removeUser(user);
    console.log(instance);
}

streamTest();