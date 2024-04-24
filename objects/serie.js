"use strict";

import { Production } from "./production.js";
import { Resource } from "./resource.js";
import {FailedEmptyException, FailedObjTypeException} from "../js/exception.js";

class Serie extends Production{

    #resource;
    #locations;
    #seasons;

    constructor(resource, locations, seasons, title, link, publication, synopsis, image){
        super(title, link, publication, synopsis, image);

        if (!(resource instanceof Resource)) throw new FailedObjTypeException();
        
        this.#resource = resource;
        this.#locations = locations;
        this.#seasons = seasons;
    }

    get resource() {
        return this.#resource;
    }
    get locations() {
        return this.#locations;
    }

    get seasons() {
        return this.#seasons;
    }

    set resource(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("resource");
        this.#resource = value;
    }

    set locations(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("locations");
        this.#locations = value;
    }

    set seasons(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("seasons");
        this.#seasons = value;
    }

    toString(){
        return super.toString() + ` / ${this.#resource}, Lugar: ${this.#locations}, Temporadas: ${this.#seasons}`;
    }
}

export{Serie};