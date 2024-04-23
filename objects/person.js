"use strict";
import {FailedEmptyException, FailedObjTypeException} from "../js/exception.js";
class Person{

    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    constructor(name, lastname1, born){

        if (name === "" || name === undefined) throw new FailedEmptyException();

        if(!(new.target === Person)) throw new FailedObjTypeException("Person");

        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = null;
        this.#born = born;
        this.#picture = null;
    }

    get name() {
        return this.#name;
    }

    get lastname1() {
        return this.#lastname1;
    }

    get lastanme2() {
        return this.#lastname2;
    }

    get born() {
        return this.#born;
    }

    get picture() {
        return this.#picture;
    }

    set name(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("name");
        this.#name = value;
    }

    set lastname1(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("lastname1");
        this.#lastname1 = value;
    }

    set lastanme2(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("lastname2");
        this.#lastname2 = value;
    }

    set born(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("born");
        this.#born = value;
    }

    set picture(value) {
        if (value === undefined || value === "") throw new ("picture");
        this.#picture = value;
    }

    toString() {
        return `Nombre: ${this.#name}, 1er apellido: ${this.#lastname1}, 2do apellido: ${this.#lastname2}, Fecha de nacimiento: ${this.#born}, Imagen: ${this.#picture}`;
    }
}

export {Person};