"use strict";
import { FailedExistException, FailedEmptyException, FailedObjTypeException, FailedNotExistException } from "./exception.js";
import { Category } from "../objects/category.js";
import { User } from "../objects/user.js";

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

        //método privado para obtener la posición en la que se encuentra
        //un elemento por parámetro, buscándolo por contenido
        #getCatPos(elem) {
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

            let position = this.#getCatPos(elem);
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
            let cat = this.#getCatPos(elem);
            if (cat !== -1) {
                this.#categories.splice(cat, 1);

                console.log("Categoría " +elem.name+ " eliminada del sistema.");
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

            console.log("El usuario " +elem.username+ " ha sido añadido");
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

            console.log("El usuario "+elem.username+ " ha sido eliminado.");
            return this.#users.length;
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

export default StreamManager;