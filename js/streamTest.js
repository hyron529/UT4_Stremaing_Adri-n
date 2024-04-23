import {Category} from "../objects/category.js";
import { Person } from "../objects/person.js";
import {Resource} from "../objects/resource.js";
import {Coordinate} from "../objects/coordinate.js";
import {User} from "../objects/user.js";
import {Movie} from "../objects/movie.js";
import {Serie} from "../objects/serie.js";
import {Production} from "../objects/production.js";

function streamTest(){

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

    /*
    let resource = new Resource();
    resource.duration = "120";
    resource.link = "aaaaaa";
    console.log(resource.toString());
    */

    let coordinate = new Coordinate(60,64);
    console.log(coordinate.toString());

    let user = new User("Adrián", "Adrian@gmail.com", "adrianNN");
    console.log(user.toString());

    let movie = new Movie("Saw X", "USA", "2023", "Relata los orígenes de las torturas de John Kramer tras el cáncer", "john kramer", coordinate);
    console.log(movie.toString());

    let serie = new Serie("30 monedas", "España", "2021", "Sucesos paranormales en un pueblo castellano por conseguir las 30 monedas.");
    console.log(serie.toString());
}

streamTest();