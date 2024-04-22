"use strict";
import {FailedEmptyException, FailedObjTypeException} from "../js/exception.js";
class Resource{

    #duration;
    #link;

    constructor(duration, link){

        if (duration === "" || duration === undefined) throw new FailedEmptyException("duration");
        if (link === "" || link === undefined) throw new FailedEmptyException("link");
        if (!(new.target === Resource)) throw new FailedObjTypeException("Resource");

        this.#duration = duration;
        this.#link = link;
    }

    get duration() {
        return this.#duration;
    }

    get link() {
        return this.#link;
    }

    set duration(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("duration");
        this.#duration = value;
    }

    set link(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("link");
        this.#link = value;
    }

    toString(){
        return `Duración: ${this.#duration}, Link: ${this.#link}`;
    }
}

export{Resource};