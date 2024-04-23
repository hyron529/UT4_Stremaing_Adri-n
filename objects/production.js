"use strict";

import { FailedEmptyException } from "../js/exception.js";

class Production {
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    constructor(title, publication) {
        if (title === "" || title === undefined) throw new FailedEmptyException("title");
        if (publication === "" || publication === undefined) throw new FailedEmptyException("publication");

        this.#title = title;
        this.#nationality = null;
        this.#publication = publication;
        this.#synopsis = null;
        this.#image = null;
    }

    get title() {
        return this.#title;
    }

    get nationality() {
        return this.#nationality;
    }

    get publication() {
        return this.#publication;
    }

    get synopsis() {
        return this.#synopsis;
    }

    get image() {
        return this.#image;
    }

    set title(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("title");
        this.#title = value;
    }

    set nationality(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("nationality");
        this.#nationality = value;
    }

    set publication(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("publication");
        this.#publication = value;
    }

    set synopsis(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("synopsis");
        this.#synopsis = value;
    }

    set image(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("image");
        this.#image = value;
    }

    toString() {
        return `Titulo: ${this.#title}, Nacionalidad: ${this.#nationality}, Publicación: ${this.#publication}, Sinópsis: ${this.#synopsis}, Imagen: ${this.#image}`;
    }
}

export { Production };
