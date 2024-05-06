"use strict";
import {FailedEmptyException, FailedObjTypeException} from "../exception.js";
class User{

    #username;
    #email;
    #password;

    constructor(username, email, password){

        if (username === "" || username === undefined) throw new FailedEmptyException("username");
        if (email === "" || email === undefined) throw new FailedEmptyException("email");
        if (password === "" || password === undefined) throw new FailedEmptyException("password");
        if (!(new.target === User)) throw new FailedObjTypeException("User");

        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    set username(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("username");
        this.#username = value;
    }

    set email(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("email");
        this.#email = value;
    }

    set password(value) {
        if (value === undefined || value === "") throw new FailedEmptyException("password");
        this.#password = value;
    }

    toString(){
        return `Usuario: ${this.#username}, Email: ${this.#email}, Clave: ${this.#password}`;
    }
}

export{User};