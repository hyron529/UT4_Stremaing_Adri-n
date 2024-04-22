"use strict";
import {FailedValueException} from "../js/exception.js";

class Coordinate {

    //Primero definimos las propiedades que va a tener Coordinate

    #latitude;
    #longitude;

    /*
        Definición del constructor de la clase Coordinate
        En este caso, necesitamos introducir ambas propiedades para tener latitud y longitud
        Antes de definir las variables, hay que comprobar si lo que se ha introducido es un numero,
        y si cumple los valores establecidos 
    */
    constructor(latitude, longitude) {

        latitude = typeof latitude !== "undefined" ? Number(latitude).valueOf() : 0;
        longitude = typeof longitude !== "undefined" ? Number(longitude).valueOf() : 0;

        if (latitude <= -180 || latitude >= 180 || Number.isNaN(latitude)) {
            throw new FailedValueException("latitude");
        }

        if (longitude <= -180 || longitude >= 180 || Number.isNaN(longitude)) {
            throw new FailedValueException("longitude");
        }

        this.#latitude = latitude;
        this.#longitude = longitude;

    }

    get latitude() {
        return this.#latitude;
    }

    get longitude() {
        return this.#longitude;
    }

    set latitude(value) {
        latitude = typeof latitude !== "undefined" ? Number(latitude).valueOf() : 0;
        if ((Number.isNaN(latitude) || latitude < -90 || latitude > 90)) throw new FailedValueException("latitude");
        this.#latitude = value;
    }

    set longitude(value) {
        longitude = typeof longitude !== "undefined" ? Number(longitude).valueOf() : 0;
        if ((Number.isNaN(longitude) || longitude < -180 || longitude > 180)) throw new FailedValueException("longitude");
        this.#longitude = value;
    }

    toString() {
        return `Latitud: ${this.#latitude}, Longitud: ${this.#longitude}]`;
    }
}

export { Coordinate };