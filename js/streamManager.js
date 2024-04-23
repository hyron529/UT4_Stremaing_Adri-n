"use strict";
import { FailedExistException, FailedEmptyException, FailedObjTypeException } from "./exception.js";


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


        #getCatPos(elem) {
            if (!(elem instanceof Category)) throw new FailedObjTypeException();

            function compareElements(element) {
                return (element.category.name === elem.name)
            }

            return this.#categories.findIndex(compareElements);
        }

        addCategory(element) {
            if ((!(element instanceof Category)) || (element == null)) throw new FailedObjTypeException();

            let position = this.#getCatPos(element);
            if (position === -1) {
                this.#categories.push(
                    {
                        category: element,
                        products: []
                    }
                );

                return this.#categories;

            } else {
                throw new FailedExistException();
            }
        }

        removeCategory(element) {

            if ((!(element instanceof Category)) || (element == null)) throw new FailedObjTypeException();
            let categoryP = this.#getCatPos(element);
            if (categoryP !== -1) {
                this.#categories.splice(categoryP, 1);
                return this.#categories.length;

            } else {
                throw new FailedExistException();
            }

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

    }

    function createInstance() {
        const streamManager = new StreamManager();
        return streamManager;
    }

    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    }
});

export { StreamManager };