"use strict";

import { Production } from "./production.js";
import { Resource } from "./resource.js";
import {FailedEmptyException} from "../js/exception.js";

class Movie extends Production{

    #locations = [];
    #resource;

    constructor(locations, resource){
        super(title, nationality, publication, synopsis, image);

        if(!(resource instanceof Resource)) throw new FailedEmptyException();

        this.#locations = locations;
        this.#resource = resource;
    }

    get resource() {
        return this.#resource;
    }
    get locations() {
        return this.#locations;
    }

    set resource(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("resource");
        this.#resource = value;
    }

    set locations(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("locations");
        this.#locations = value;
    }

    toString(){
        return super.toString() + ` / ${this.#resource}, Lugar: ${this.#locations}`;
    }
}