"use strict";

import { Production } from "./production.js";
import { Resource } from "./resource.js";
import { FailedEmptyException } from "../js/exception.js";

class Movie extends Production {
    #locations;
    #resource;

    constructor(title, publication, locations, resource) {
        super(title, publication);
        
        if (!(resource instanceof Resource)) throw new FailedEmptyException("resource");

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

    toString() {
        return super.toString() + `, Resource: ${this.#resource.toString()}, Locations: ${this.#locations.toString()}`;
    }
}

export { Movie };
