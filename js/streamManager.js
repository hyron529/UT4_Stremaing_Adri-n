"use strict";
import {
  FailedIsAssignedException,
  FailedExistException,
  FailedEmptyException,
  FailedObjTypeException,
  FailedNotExistException,
} from "./exception.js";
import { Category } from "./objects/category.js";
import { User } from "./objects/user.js";
import { Production } from "./objects/production.js";
import { Actor } from "./objects/actor.js";
import { Director } from "./objects/director.js";
import { Serie } from "./objects/serie.js";
import { Movie } from "./objects/movie.js";

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
      if (name === null) throw new FailedEmptyException("name");
      this.#name = name;
    }

    get categories() {
      let list = this.#categories;

      return {
        *[Symbol.iterator]() {
          for (let category of list) {
            yield category;
          }
        },
      };
    }

    get productions() {
      let list = this.#productions;

      return {
        *[Symbol.iterator]() {
          for (let prod of list) {
            yield prod;
          }
        },
      };
    }

    get actors() {
      let list = this.#actors;

      return {
        *[Symbol.iterator]() {
          for (let actor of list) {
            yield actor;
          }
        },
      };
    }

    get directors() {
      let list = this.#directors;

      return {
        *[Symbol.iterator]() {
          for (let director of list) {
            yield director;
          }
        },
      };
    }

    get users() {
      let list = this.#users;

      return {
        *[Symbol.iterator]() {
          for (let user of list) {
            yield user;
          }
        },
      };
    }

    //método para obtener la posición en la que se encuentra el objeto
    // director en su array correspondiente, vemos si es Director y comparamos el contenido
    // del objeto de la lista con el del parámetro
    getDirPos(dir) {
      if (!(dir instanceof Director)) throw new FailedObjTypeException();
      for (let i = 0; i < this.#directors.length; i++) {
        if (this.#directors[i].director === dir) {
          return i;
        }
      }
      return -1;
    }

    //método para obtener la posición en la que se encuentra el objeto
    // actor en su array correspondiente, vemos si es Actor y comparamos el contenido
    // del objeto de la lista con el del parámetro
    getActPos(act) {
      if (!(act instanceof Actor)) throw new FailedObjTypeException();
      for (let i = 0; i < this.#actors.length; i++) {
        if (this.#actors[i].actors.name === act.name) {
          return i;
        }
      }
      return -1;
    }

    //método para obtener la posición de una producción
    getProdPos(production) {
      for (let i = 0; i < this.#productions.length; i++) {
        if (this.#productions[i].title === production.title) {
          return i;
        }
      }

      return -1;
    }

    //método para obtener la posición en la que se encuentra
    //un elemento por parámetro, buscándolo por contenido
    getCatPos(elem) {
      if (!(elem instanceof Category)) throw new FailedObjTypeException();
      for (let i = 0; i < this.#categories.length; i++) {
        if (this.#categories[i].category.name === elem.name) {
          return i;
        }
      }
      return -1;
    }

    // método para añadir una categoría, conteolamos que sea un objeto de ese tipo
    // y obtenemos la posición, y si la obtiene, añadimos un objeto literal el objeto literal
    // con su array para las producciones que contendrá
    addCategory(elem) {
      if (!(elem instanceof Category) || elem == null)
        throw new FailedObjTypeException();

      let position = this.getCatPos(elem);
      if (position === -1) {
        this.#categories.push({
          category: elem,
          productions: [],
        });
        console.log("Categoría " + elem.name + " añadida.");
        return this.#categories.length;
      } else {
        throw new FailedExistException();
      }
    }

    // método que elimina una categoría, comprobamos que es una categpría y obtenemos la posición
    // se elimina la categoría si la misma existe en la lista
    removeCategory(elem) {
      if (!(elem instanceof Category) || elem == null)
        throw new FailedObjTypeException();
      let cat = this.getCatPos(elem);
      if (cat !== -1) {
        this.#categories.splice(cat, 1);

        console.log("Categoría " + elem.name + " eliminada del sistema.");
        return this.#categories.length;
      } else {
        throw new FailedExistException();
      }
    }

    // método para añadir un usuraio. comprobamos que el nombre y el mail no están en la lista
    // vemos si se trata de un objeto user y lo añadimos
    addUser(elem) {
      if (
        this.#users.findIndex((user) => user.username === elem.username) !== -1
      )
        throw new FailedExistException();
      if (this.#users.findIndex((user) => user.email === elem.email) !== -1)
        throw new FailedExistException();

      if (!(elem instanceof User) || elem == null)
        throw new FailedObjTypeException();
      this.#users.push(elem);

      console.log("El usuario " + elem.username + " ha sido añadido");
      return this.#users.length;
    }

    // método para eliminar un usuario, comprobamos que sea un objeto user,
    // y buscamos que lo que le hemos pasado coincide con el contenido en la lista, para
    // poder eliminarlo
    removeUser(elem) {
      if (!(elem instanceof User) || elem == null)
        throw new FailedObjTypeException();
      if (
        this.#users.findIndex((user) => user.username === elem.username) === -1
      )
        throw new FailedExistException();

      let userIndex = this.#users.findIndex(
        (user) => user.username === elem.username
      );
      this.#users.splice(userIndex, 1);

      console.log("El usuario " + elem.username + " ha sido eliminado.");
      return this.#users.length;
    }

    // método para aadir una producción, comprobamos que el objeto es correcto
    // y en caso contrario la añadimos
    addProduction(elem) {
      if (!(elem instanceof Production)) throw new FailedObjTypeException();
      if (elem === null || elem === undefined)
        throw new FailedObjTypeException();

      this.#productions.push(elem);
      console.log("La producción " + elem.title + " ha sido añadida.");
      return this.#productions.length;
    }

    // método para eliminar una producción. comprobamos que se trata de una producción
    // y si lo encontramos en la lista, lo eliminamos
    removeProduction(elem) {
      if (!(elem instanceof Production)) throw new FailedObjTypeException();
      if (elem === null || elem === undefined)
        throw new FailedObjTypeException();

      // Busca el índice del elemento en la lista de producciones
      let index = this.#productions.findIndex(
        (production) => production === elem
      );
      if (index !== -1) {
        // Elimina el elemento de la lista de producciones
        this.#productions.splice(index, 1);

        // Busca y elimina el elemento de las categorías
        for (const category of this.#categories) {
          let index2 = category.productions.findIndex(
            (production) => production === elem
          );
          if (index2 !== -1) {
            category.productions.splice(index2, 1);
            break; // Rompe el bucle una vez que se haya eliminado el elemento
          }
        }

        for (const director of this.#directors) {
          let index = director.productions.findIndex(
            (production) => production.title === elem.title
          );
          director.productions.splice(index, 1);
        }

        for (const actor of this.#actors) {
            let index = actor.productions.findIndex(
              (production) => production.title === elem.title
            );
            actor.productions.splice(index, 1);
        }

        console.log("La producción " + elem.title + " ha sido eliminada.");
        return this.#productions.length;
      } else {
        console.log("La producción " + elem.title + " no se encontró.");
        return this.#productions.length;
      }
    }

    // método que añade actores a la lista, obtenemos la posición del actor
    // y lo añadimos al array que contiene a los actores
    addActor(elem) {
      if (!(elem instanceof Actor) || elem == null)
        throw new FailedObjTypeException();
      let position = this.getActPos(elem);
      if (position === -1) {
        this.#actors.push({
          actors: elem,
          productions: [],
        });
        console.log("Actor " + elem.name + " " + elem.lastname1 + " añadido.");
        return this.#actors;
      } else {
        throw new FailedExistException();
      }
    }

    // método que elimina un actor, comprbamos que es el mismo tipo de objeto
    // y obtenemos la posición para poder eliminarlo
    removeActor(elem) {
      if (!(elem instanceof Actor) || elem == null)
        throw new FailedObjTypeException();

      let position = this.getActPos(elem);
      if (position !== -1) {
        this.#actors.splice(position, 1);

        console.log(
          "El actor " + elem.name + " " + elem.lastname1 + " ha sido eliminado"
        );
        return this.#actors.length;
      } else {
        throw new FailedNotExistException();
      }
    }

    // método que añade directores a la lista, obtenemos la posición del actor
    // y lo añadimos al array que contiene a los directores
    addDirector(elem) {
      if (!(elem instanceof Director) || elem == null)
        throw new FailedObjTypeException();

      let position = this.getDirPos(elem);
      if (position === -1) {
        this.#directors.push({
          director: elem,
          productions: [],
        });
        console.log(
          "Director " + elem.name + " " + elem.lastname1 + " añadido."
        );
        return this.#directors;
      } else {
        throw new FailedExistException();
      }
    }

    // método que elimina un director, comprbamos que es el mismo tipo de objeto
    // y obtenemos la posición para poder eliminarlo
    removeDirector(elem) {
      if (!(elem instanceof Director) || elem == null)
        throw new FailedObjTypeException();

      let position = this.getDirPos(elem);
      if (position !== -1) {
        this.#directors.splice(position, 1);

        console.log(
          "El director " +
            elem.name +
            " " +
            elem.lastname1 +
            " ha sido eliminado"
        );
        return this.#directors.length;
      } else {
        throw new FailedNotExistException();
      }
    }

    //método que añade una producción a una categoría
    // comprobamos que es una categoría y almacenamos el array de producciones
    // obtenemos la posicion de la producción y la categoría
    // obtenemos el array de producciones de su categoria en la posicion encontrada
    // iteramos en el array prods, comprobamos, obtenemos su posicion para verificar si esta o no
    assignCategory(cat, ...prods) {
      if (!(cat instanceof Category)) throw new FailedObjTypeException();

      let categoryPosition = this.getCatPos(cat);

      if (categoryPosition === -1) {
        this.addCategory(cat);
        categoryPosition = this.getCatPos(cat);
      }

      // Obtenemos el array de producciones de la categoria indicada
      let arrayCategoryProductions =
        this.#categories[categoryPosition].productions;

      // Recorremos las producciones proporcionadas
      prods.forEach((prod) => {
        if (!(prod instanceof Production)) throw new FailedObjTypeException();

        let productionPosition = this.getProdPos(prod);

        // Si la producción no está en la lista, la añadimos
        if (productionPosition === -1) {
          arrayCategoryProductions.push(prod);
        } else {
          throw new FailedIsAssignedException();
        }
      });

      console.log(`Producciones asignadas a la categoría ${cat.name}.`);
      console.log(this.#categories);

      return this;
    }

    //método que desasigna una producción de una categoria
    //comprobamos que se trata de los objetos adecuados y obtenemos las
    //posiciones de cada uno en sus arrays, y si lo encuentra, entonces
    //se podrá eliminar, primero obtenemos la posicion de la categoria y comprobamos su
    //existencia, obtenemos el array de producciones de su categoria en la posicion encontrada, y
    //despues comprobamos que el array no este vacio, recorremos el array creado y comprobamos
    //que el titulo de la produccion del array coincide con el introducido por parametro
    deassignCategory(cat, prod) {
      if (!(cat instanceof Category)) throw new FailedObjTypeException();
      if (!(prod instanceof Production)) throw new FailedObjTypeException();

      let categoryPosition = this.getCatPos(cat);
      if (categoryPosition === -1) throw new FailedNotExistException();

      let arrayCategoryProductions =
        this.#categories[categoryPosition].productions;

      if (arrayCategoryProductions.length === 0)
        throw new FailedEmptyException();

      for (let i = 0; i < arrayCategoryProductions.length; i++) {
        if (arrayCategoryProductions[i].title === prod.title) {
          arrayCategoryProductions.splice(i, 1);
        }
      }
    }

    //método que añade un director a una produccion
    // comprobamos que es una categoría y almacenamos el array de producciones
    // obtenemos la posicion de la producción y la categoría
    // obtenemos el array de producciones de su categoria en la posicion encontrada
    // iteramos en el array prods, comprobamos, obtenemos su posicion para verificar si esta o no
    assignDirector(dir, ...prods) {
      if (!(dir instanceof Director)) throw new FailedObjTypeException();

      let directorPosition = this.getDirPos(dir);
      if (directorPosition === -1) {
        this.addDirector(dir);
        directorPosition = this.getDirPos(dir);
      }

      let arrayDirProductions = this.#directors[directorPosition].productions;

      prods.forEach((prod) => {
        if (!(prod instanceof Production)) throw new FailedObjTypeException();

        let productionPosition = this.getProdPos(prod);

        if (productionPosition === -1) {
          this.addProduction(prod);
        }

        if (arrayDirProductions.length === 0) {
          arrayDirProductions.push(prod);
        } else {
          arrayDirProductions.forEach((production) => {
            if (prod.title === production.title)
              throw new FailedIsAssignedException();
          });
          arrayDirProductions.push(prod);
        }
      });

      console.log(`Producciones asignadas al director ${dir.name}.`);
      return this;
    }

    // Método para desasignar una producción de un director
    deassignDirector(dir, prod) {
      if (!(dir instanceof Director)) throw new FailedObjTypeException();
      if (!(prod instanceof Production)) throw new FailedObjTypeException();

      let directorPosition = this.getDirPos(dir);
      if (directorPosition === -1) throw new FailedNotExistException();

      let index = this.#directors[directorPosition].productions.findIndex(
        (production) => production === prod
      );

      if (index !== -1) {
        this.#directors[directorPosition].productions.splice(index, 1);
      } else {
        throw new FailedIsAssignedException();
      }
    }

    //método que añade un actor a una produccion
    // comprobamos que es una categoría y almacenamos el array de producciones
    // obtenemos la posicion de la producción y la categoría
    // obtenemos el array de producciones de su categoria en la posicion encontrada
    // iteramos en el array prods, comprobamos, obtenemos su posicion para verificar si esta o no
    assignActor(actor, ...prods) {
      if (!(actor instanceof Actor)) throw new FailedObjTypeException();

      let actorPosition = this.getActPos(actor);
      if (actorPosition === -1) {
        this.addActor(actor);
        actorPosition = this.getActPos(actor);
      }

      let arrayActProductions = this.#actors[actorPosition].productions;

      prods.forEach((prod) => {
        if (!(prod instanceof Production)) throw new FailedObjTypeException();

        let productionPosition = this.getProdPos(prod);

        if (productionPosition === -1) {
          this.addProduction(prod);
        }

        if (arrayActProductions.length === 0) {
          arrayActProductions.push(prod);
        } else {
          arrayActProductions.forEach((production) => {
            if (prod.title === production.title)
              throw new FailedIsAssignedException();
          });
          arrayActProductions.push(prod);
        }
      });

      console.log(`Producciones asignadas al actor ${actor.name}.`);
      console.log(this.#actors);
      return this;
    }

    // Método para desasignar una producción de un actor
    deassignActor(actor, prod) {
      if (!(actor instanceof Actor)) throw new FailedObjTypeException();
      if (!(prod instanceof Production)) throw new FailedObjTypeException();

      let actorPosition = this.getActPos(actor);
      if (actorPosition === -1) throw new FailedNotExistException();

      let index = this.#actors[actorPosition].productions.findIndex(
        (production) => production === prod
      );

      if (index !== -1) {
        this.#actors[actorPosition].productions.splice(index, 1);
      } else {
        throw new FailedIsAssignedException();
      }
    }

    //iterador para obtener las producciones de un director
    //vemos si es una persona y obtenemos la posición del array
    //en una variable definimos el array de directores con el de producciones
    //se recorren los elementos obtenidos con yield
    *getProductionsDirector(dir) {
      if (!(dir instanceof Director) || dir == null)
        throw new FailedObjTypeException();
      let positionDir = this.getDirPos(dir);
      if (positionDir === -1) throw new FailedNotExistException();

      let dirList = this.#directors[positionDir].productions;
      for (let direc of dirList) {
        yield direc;
      }
    }

    //iterador para obtener las producciones de un actor
    //vemos si es una Actora y obtenemos la posición del array
    //en una variable definimos el array de actores con el de producciones
    //se recorren los elementos obtenidos con yield
    *getProductionsActor(actor) {
      if (!(actor instanceof Actor) || actor == null)
        throw new FailedObjTypeException();
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
    *getProductionsCategory(cat) {
      if (!(cat instanceof Category)) throw new FailedObjTypeException();
      let positionCat = this.getCatPos(cat);
      if (positionCat === -1) throw new FailedNotExistException();

      let catList = this.#categories[positionCat].productions;
      for (let cat of catList) {
        yield cat;
      }
    }

    // Metodo para obtener si un elemento existe mediante el nombre
    getCategoryWithName(name) {
      for (let i = 0; i < this.#categories.length; i++) {
        if (this.#categories[i].category.name === name) {
          return i;
        }
      }

      return -1;
    }

    getProductionWithName(name) {
      for (let i = 0; i < this.#productions.length; i++) {
        if (this.#productions[i].title === name) {
          return i;
        }
      }

      return -1;
    }

    getDirectorWithName(name) {
      for (let i = 0; i < this.#directors.length; i++) {
        if (this.#directors[i].director.name === name) {
          return i;
        }
      }

      return -1;
    }

    getActorWithName(name) {
      for (let i = 0; i < this.#actors.length; i++) {
        if (this.#actors[i].actors.name === name) {
          return i;
        }
      }

      return -1;
    }

    // Metodos para la creacion de los objetos
    createCategory(name) {
      let category;
      let pos = this.getCategoryWithName(name);

      if (pos !== -1) {
        category = this.#categories[pos].category;
      } else {
        category = new Category(name);
      }

      // Devolvemos la categoria
      return category;
    }

    // Metodo para obtener una produccion en concreto por el nombre
    createProduction(name, type) {
      let production;
      let pos = this.getProductionWithName(name);

      if (pos !== -1) {
        production = this.#productions[pos];
      } else if (type) {
        if (type === "serie") {
          production = new Serie(name);
        } else if (type === "pelicula") {
          production = new Movie(name);
        }
      }

      // Devolvemos la categoria
      return production;
    }

    createDirector(name) {
      let direct;
      let pos = this.getDirectorWithName(name);

      if (pos !== -1) {
        direct = this.#directors[pos].director;
      } else {
        direct = new Director(name);
      }

      // Devolvemos la categoria
      return direct;
    }

    createActor(name) {
      let act;
      let pos = this.getActorWithName(name);

      if (pos !== -1) {
        act = this.#actors[pos].actors;
      } else {
        act = new Actor(name);
      }

      // Devolvemos la categoria
      return act;
    }

    getRandomProductions() {
      let arrayProductions = [];

      while (arrayProductions.length !== 3) {
        let random = Math.floor(Math.random() * this.#productions.length);

        if (!arrayProductions.includes(this.#productions[random])) {
          arrayProductions.push(this.#productions[random]);
        }
      }

      return arrayProductions;
    }
  }

  function createInstance() {
    const streamManager = new StreamManager();
    Object.freeze(streamManager);
    return streamManager;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export default StreamManager;
