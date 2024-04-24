"use strict";
import { FailedExistException, FailedEmptyException, FailedObjTypeException, FailedNotExistException } from "./exception.js";
import { Category } from "../objects/category.js";
import { User } from "../objects/user.js";
import { Production } from "../objects/production.js";
import { Person } from "../objects/person.js";

const StreamManager = (function () {

    let instance;

    class StreamManager {

        #name;
        #categories = [];
        #users = [];
        #productions = [];
        #actors = [];
        #directors = [];
        #windows = [];

        constructor(name = "Streaming 4 You") {

            if ((name === null)) throw new FailedEmptyException("name");
            this.#name = name;
        }

        get categories() {
            let list = this.#categories;

            return {
                *[Symbol.iterator]() {
                    for (let category of list) {
                        yield category;
                    }
                }
            }
        }

        get users() {
            let list = this.#users;

            return {
                *[Symbol.iterator]() {
                    for (let user of list) {
                        yield user;
                    }
                }
            }
        }

        //método para obtener la posición en la que se encuentra el objeto
        // director en su array correspondiente, vemos si es Person y comparamos el contenido
        // del objeto de la lista con el del parámetro
        getDirPos(elem) {
            if (!(elem instanceof Person)) throw new FailedObjTypeException();
            function compare(direc) {
                return ((direc.director.name === elem.name) && (direc.director.lastname1 === elem.lastname1))
            }
            return this.#directors.findIndex(compare);
        }

        //método para obtener la posición en la que se encuentra el objeto
        // actor en su array correspondiente, vemos si es Person y comparamos el contenido
        // del objeto de la lista con el del parámetro
        getActPos(elem) {
            if (!(elem instanceof Person)) throw new FailedObjTypeException();
            function compare(act) {
                return ((act.actor.name === elem.name) && (act.actor.lastname1 === elem.lastname1))
            }
            return this.#actors.findIndex(compare);
        }

        //método para obtener la posición de una producción
        getProdPos(production, prod = this.#productions) {
            function compare(element) {
                return (element.title === production.title)
            }
            return prod.findIndex(compare);
        }

        //método para obtener la posición en la que se encuentra
        //un elemento por parámetro, buscándolo por contenido
        getCatPos(elem) {
            if (!(elem instanceof Category)) throw new FailedObjTypeException();
            function compare(element) {
                return (element.category.name === elem.name)
            }

            return this.#categories.findIndex(compare);
        }

        //método para añadir una categoría, conteolamos que sea un objeto de ese tipo
        // y obtenemos la posición, y si la obtiene, añadimos un objeto literal el objeto literal
        // con su array para las producciones que contendrá
        addCategory(elem) {
            if ((!(elem instanceof Category)) || (elem == null)) throw new FailedObjTypeException();

            let position = this.getCatPos(elem);
            if (position === -1) {
                this.#categories.push(
                    {
                        category: elem,
                        productions: []
                    }
                );
                console.log("Categoría " + elem.name + " añadida.");
                return this.#categories;

            } else {
                throw new FailedExistException();
            }
        }

        //método que elimina una categoría, comprobamos que es una categpría y obtenemos la posición
        //se elimina la categoría si la misma existe en la lista
        removeCategory(elem) {
            if ((!(elem instanceof Category)) || (elem == null)) throw new FailedObjTypeException();
            let cat = this.getCatPos(elem);
            if (cat !== -1) {
                this.#categories.splice(cat, 1);

                console.log("Categoría " + elem.name + " eliminada del sistema.");
                return this.#categories.length;
            } else {
                throw new FailedExistException();
            }
        }

        //método para añadir un usuraio. comprobamos que el nombre y el mail no están en la lista
        //vemos si se trata de un objeto user y lo añadimos
        addUser(elem) {

            if ((this.#users.findIndex((user) => user.username === elem.username) !== -1)) throw new FailedExistException;
            if ((this.#users.findIndex((user) => user.email === elem.email) !== -1)) throw new FailedExistException;

            if ((!(elem instanceof User)) || (elem == null)) throw new FailedObjTypeException();
            this.#users.push(elem);

            console.log("El usuario " + elem.username + " ha sido añadido");
            return this.#users.length;
        }

        //método para eliminar un usuario, comprobamos que sea un objeto user, 
        // y buscamos que lo que le hemos pasado coincide con el contenido en la lista, para
        // poder eliminarlo
        removeUser(elem) {
            if ((!(elem instanceof User)) || (elem == null)) throw new FailedObjTypeException();
            if ((this.#users.findIndex((user) => user.username === elem.username) === -1)) throw new FailedExistException();

            let userIndex = this.#users.findIndex((user) => user.username === elem.username);
            this.#users.splice(userIndex, 1);

            console.log("El usuario " + elem.username + " ha sido eliminado.");
            return this.#users.length;
        }

        //método para aadir una producción, comprobamos que el objeto es correcto
        // y en caso contrario la añadimos
        addProduction(elem) {
            if (!(elem instanceof Production)) throw new FailedObjTypeException();
            if ((elem === null) || (elem === undefined)) throw new FailedObjTypeException();

            this.#productions.push(elem);
            console.log("La producción " + elem.title + " ha sido añadida.");
            return this.#productions.length;
        }

        //método para eliminar una producción. comprobamos que se trata de una producción
        // y si lo encontramos en la lista, lo eliminamos
        removeProduction(elem) {
            if (!(elem instanceof Production)) throw new FailedObjTypeException();
            if ((elem === null) || (elem === undefined)) throw new FailedObjTypeException();

            let index = this.#productions.findIndex((production) => production.name === elem.name);
            this.#productions.splice(index, 1);

            console.log("La produccion " + elem.title + " ha sido eliminada.");
            return this.#productions.length;
        }

        //método que añade actores a la lista, obtenemos la posición del actor
        // y lo añadimos al array que contiene a los actores
        addActor(elem) {
            if ((!(elem instanceof Person)) || (elem == null)) throw new FailedObjTypeException();
            let position = this.getActPos(elem);
            if (position === -1) {
                this.#actors.push(
                    {
                        actors: elem,
                        productions: []
                    }
                );
                console.log("Actor " + elem.name + " " + elem.lastname1 + " añadido.");
                return this.#actors;

            } else {
                throw new FailedExistException();
            }
        }
        /*
        //método que elimina un actor, comprbamos que es el mismo tipo de objeto
        // y obtenemos la posición para poder eliminarlo
        removeActor(elem) {
            if ((!(elem instanceof Person)) || (elem == null)) throw new FailedObjTypeException();

            let position = this.getActPos(elem);
            if (position !== -1) {
                this.#actors.splice(position, 1);

                console.log("El actor " + elem.name + " " + elem.lastname1 + " ha sido eliminado");
                return this.#actors.length;
            } else {
                throw new FailedNotExistException();
            }
        }
        */

        //método que añade directores a la lista, obtenemos la posición del actor
        // y lo añadimos al array que contiene a los directores
        addDirector(elem) {


            if ((!(elem instanceof Person)) || (elem == null)) throw new FailedObjTypeException();

            let position = this.getDirPos(elem);
            if (position === -1) {
                this.#directors.push(
                    {
                        director: elem,
                        products: []
                    }
                );
                console.log("Director " + elem.name + " " + elem.lastname1 + " añadido.");
                return this.#directors;
            } else {
                throw new FailedExistException();
            }
        }


        //método que elimina un director, comprbamos que es el mismo tipo de objeto
        // y obtenemos la posición para poder eliminarlo
        removeDirector(elem) {
            if ((!(elem instanceof Person)) || (elem == null)) throw new FailedObjTypeException();

            let position = this.getDirPos(elem);
            if (position !== -1) {
                this.#directors.splice(position, 1);

                console.log("El director " + elem.name + " " + elem.lastname1 + " ha sido eliminado");
                return this.#directors.length;
            } else {
                throw new FailedNotExistException();
            }
        }

        //método que añade una producción a una categoría
        // comprobamos que es una categoría y almacenamos el array de producciones
        // obtenemos la posicion de la producción y la categoría
        // si es igual a -1 no existe, así que la añadimos a la lista y comprobamos
        // que ha sido asignado
        assignCategory(cat, prod) {
            if (!(cat instanceof Category)) throw new FailedObjTypeException();

            let production = this.#productions;

            for (let i = 0; i < prod.length; i++) {

                let position = this.getProdPos(prod[i], production);

                if (position === -1) {
                    this.addProduction(production[i]);
                    position = this.#productions.length - 1

                }

                let positionCat = this.getCatPos(cat);

                if (positionCat === -1) {
                    this.addCategory(cat);
                    positionCat = this.#categories.length - 1

                }
                if (this.getProdPos(production, this.#categories[positionCat].productions) === -1) {
                    this.#categories[positionCat].productions.push(this.#productions[position]);
                }
            }
            console.log("La producción " + prod.title + " se ha añadido a " + cat.name);
        }

        deassignCategory(cat, prod) {
            if (!(cat instanceof Category)) throw new FailedObjTypeException();
            if (!(prod instanceof Production)) throw new FailedObjTypeException();

            let positionCat = this.getCatPos(cat);
            let pro = this.#categories[positionCat].products;

            let positionProd = this.getProdPos(prod, pro);
            if (positionCat !== -1) {
                if (positionProd !== -1) {
                    this.#categories[positionCat].productions.splice(positionProd, 1);

                } else {
                    throw FailedNotExistException();
                }
            } else {
                throw FailedNotExistException();
            }
            console.log("Producción " +prod.title+ " eliminadad de la categoría " +cat.name);
            return this.#categories[positionCat].productions.length;
        }
    }

    function createInstance() {
        const streamManager = new StreamManager();
        return streamManager;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
})();

export { StreamManager };