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
        getDirPos(dir) {
            if (!(dir instanceof Person)) throw new FailedObjTypeException();
            for (let i=0; i<this.#directors.length; i++) {
                if (this.#directors[i].directrors.name === dir.name) {
                    return i;
                }
            }
            return -1;
        }

        //método para obtener la posición en la que se encuentra el objeto
        // actor en su array correspondiente, vemos si es Person y comparamos el contenido
        // del objeto de la lista con el del parámetro
        getActPos(act) {
            if (!(act instanceof Person)) throw new FailedObjTypeException();
            for (let i = 0; i < this.#actors.length; i++) {
                if (this.#actors[i].actors.name === act.name) {
                    return i;
                }
            }
            return -1;
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
        

        //método que añade directores a la lista, obtenemos la posición del actor
        // y lo añadimos al array que contiene a los directores
        addDirector(elem) {


            if ((!(elem instanceof Person)) || (elem == null)) throw new FailedObjTypeException();

            let position = this.getDirPos(elem);
            if (position === -1) {
                this.#directors.push(
                    {
                        director: elem,
                        productions: []
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

        //método que desasigna una producción de una categoria
        //comprobamos que se trata de los objetos adecuados y obtenemos las 
        //posiciones de cada uno en sus arrays, y si lo encuentra, entonces
        //se podrá eliminar
        deassignCategory(cat, prod) {
            if (!(cat instanceof Category)) throw new FailedObjTypeException();
            if (!(prod instanceof Production)) throw new FailedObjTypeException();

            let positionCat = this.getCatPos(cat);
            let pro = this.#categories[positionCat].productions;

            let positionProd = this.getProdPos(prod, pro);
            if (positionCat !== -1) {
                if (positionProd !== -1) {
                    this.#categories[positionCat].productions.splice(positionProd, 1);

                } else {
                    throw new FailedNotExistException();
                }
            } else {
                throw FailedNotExistException();
            }
            console.log("Producción " + prod.title + " eliminada de la categoría " + cat.name);
            return this.#categories[positionCat].productions.length;
        }

        //método que añade un director a una produccion
        // comprobamos que es una persona y almacenamos el array de producciones
        // obtenemos la posicion del person y la producción
        // si es igual a -1 no existe, así que la añadimos a la lista y comprobamos
        // que ha sido asignado
        assignDirector(dir, prod) {
            if (!(dir instanceof Person)) throw new FailedObjTypeException();
            if (!(prod instanceof Production)) throw new FailedObjTypeException();

            let pro = this.#productions;
            let positionDir = this.getDirPos(dir);
            let positionProd = this.getProdPos(prod, pro);

            if (positionDir === -1) {
                this.addDirector(dir);
                positionDir = this.#directors.length - 1
            }
            if (positionProd === -1) {
                this.addProduction(prod);
                positionProd = this.#productions.length - 1
            }
            if (this.getProdPos(prod, this.#directors[positionDir].productions) === -1)
                this.#directors[positionDir].productions.push(this.#productions[positionProd]);

            console.log("El director " + dir.name + " " + dir.lastname1 + " ha sido añadido a la producción " + prod.title);
            return this.#directors[positionDir].productions.length;
        }

        //método que desasigna un director de una produccion
        //comprobamos que se trata de los objetos adecuados y obtenemos las 
        //posiciones de cada uno en sus arrays, y si lo encuentra, entonces
        //se podrá eliminar
        /*
        deassignDirector(dir, prod) {
            if (!(dir instanceof Person)) throw new FailedObjTypeException();
            if (!(prod instanceof Production)) throw new FailedObjTypeException();

            let positionDir = this.getDirPos(dir);
            let pro = this.#directors[positionDir].productions;
            let positionProd = this.getProdPos(prod, pro);

            if (positionDir !== -1) {
                if (positionProd !== -1) {
                    this.#directors[positionDir].productions.splice(positionProd, 1)
                } else {
                    throw FailedNotExistException();
                }
            } else {
                throw FailedNotExistException();
            }

            console.log("El director " + dir.name + " " + dir.lastname1 + " ha sido eliminado de " + prod.title);
            return this.#directors[positionDir].productions.length;
        }
        */

        //método que añade un actor a una produccion
        // comprobamos que es una persona y almacenamos el array de producciones
        // obtenemos la posicion del person y la producción
        // si es igual a -1 no existe, así que la añadimos a la lista y comprobamos
        // que ha sido asignado
        assignActor(actor, prod) {
            if (!(prod instanceof Production)) throw new FailedObjTypeException();

            let pro = this.#productions;
            for (let i = 0; i < actor.length; i++) {

                let positionAct = this.getActPos(actor[i]);
                let positionProd = this.getProdPos(prod, pro);

                if (positionAct === -1) {
                    this.addActor(actor[i]);
                    positionAct = this.#actors.length - 1;
                }

                if (positionProd === -1) {
                    this.addProduction(prod);
                    positionProd = this.#productions.length - 1;
                }

                if (this.getProdPos(prod, this.#actors[positionAct].productions) === -1)
                    this.#actors[positionAct].productions.push(this.#productions[positionProd]);
            }
            console.log("El actor " + actor.name + " " + actor.lastname1 + " ha sido añadido a la producción " + prod.title);
        }

        //método que desasigna un actor de una produccion
        //comprobamos que se trata de los objetos adecuados y obtenemos las 
        //posiciones de cada uno en sus arrays, y si lo encuentra, entonces
        //se podrá eliminar
        deassignActor(actor, prod) {
            if (!(actor instanceof Person)) throw new FailedObjTypeException();
            if (!(prod instanceof Production)) throw new FailedObjTypeException();

            let positionAct = this.getActPos(actor);
            let pro = this.#actors[positionAct].productions;
            let positionProd = this.getProdPos(prod, pro);

            if (positionAct !== -1) {
                if (positionProd !== -1) {
                    this.#actors[positionAct].productions.splice(positionProd, 1)
                } else {
                    throw new FailedNotExistException();
                }

            } else {
                throw new FailedNotExistException();
            }
            console.log("El actor " + actor.name + " " + actor.lastname1 + " ha sido eliminado de la producción " + prod.title);
            return this.#actors[positionAct].productions.length;
        }

        //iterador para obtener las producciones de un director
        //vemos si es una persona y obtenemos la posición del array
        //en una variable definimos el array de directores con el de producciones
        //se recorren los elementos obtenidos con yield
        * getProductionsDirector(dir) {
            if ((!(dir instanceof Person)) || (dir == null)) throw new FailedObjTypeException();
            let positionDir = this.getDirPos(dir);
            if (positionDir === -1) throw new FailedNotExistException();

            let dirList = this.#directors[positionDir].productions;
            for (let direc of dirList) {
                yield direc;
            }
        }

        //iterador para obtener las producciones de un actor
        //vemos si es una persona y obtenemos la posición del array
        //en una variable definimos el array de actores con el de producciones
        //se recorren los elementos obtenidos con yield
        * getProductionsActor(actor) {
            if ((!(actor instanceof Person)) || (actor == null)) throw new FailedObjTypeException();
            let positionAct = this.getActPos(actor);
            if (positionAct === -1) throw new FailedNotExistException();

            let actList = this.#actors[positionAct].productions;
            for (let ac of actList) {
                yield ac;
            }
        }

        //iterador para obtener las producciones de una categoría
        //vemos si es una persona y obtenemos la posición del array
        //en una variable definimos el array de categorías con el de producciones
        //se recorren los elementos obtenidos con yield
        * getProductionsCategory(cat) {
            if (!(cat instanceof Category)) throw new FailedObjTypeException();
            let positionCat = this.getCatPos(cat);
            if (positionCat === -1) throw new FailedNotExistException();

            let catList = this.#categories[positionCat].productions;
            for (let cat of catList) {
                yield cat;
            }
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