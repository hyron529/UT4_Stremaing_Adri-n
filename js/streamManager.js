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