"use strict";

import { Production } from "./production.js";
import { Resource } from "./resource.js";
import { FailedEmptyException } from "../exception.js";

class Movie extends Production {
    #locations;
    #resource;

    constructor(title, nationality, publication, synopsis, image) {
        super(title, nationality, publication, synopsis, image);
    
        this.#locations = null;
        this.#resource = null;
    }

    get resource() {
        return this.#resource;
    }

    get locations() {
        return this.#locations;
    }

    set resource(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("resource");
        if (!(value instanceof Resource)) throw new FailedEmptyException("resource");
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
