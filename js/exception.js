class BaseException extends Error {
    constructor (message = "", fileName, fileNumber) {
        super(message, fileName, fileNumber);
        this.name = "BaseException";
        if(Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseException);
        }
    }
}


class FailedEmptyException extends BaseException {
    constructor(value, fileName, fileNumber) {
        super(
            `Error. La propiedad indicada está vacía.`,
            fileName,
            fileNumber
        );
        this.name = "FailedEmptyException";
        this.value = value;
    }
}

class FailedObjTypeException extends BaseException {
    constructor(value, fileName, fileNumber) {
        super(
            `Error. Es necesario el uso del operador new.`,
            fileName,
            fileNumber
        );
        this.name = "FailedObjTypeException";
        this.value = value;
    }
}

class FailedValueException extends BaseException {
    constructor(value, fileName, fileNumber) {
        super(
            `Error. El valor utilizado es incorrecto.`,
            fileName,
            fileNumber
        );
        this.name = "FailedValueException";
        this.value = value;
    }
}

class FailedExistException extends BaseException {
    constructor(value, fileName, fileNumber) {
        super(
            `Error. El objeto ya existe en la lista.`,
            fileName,
            fileNumber
        );
        this.name = "FailedExistException";
        this.value = value;
    }
}

export {FailedExistException ,FailedEmptyException, FailedObjTypeException, FailedValueException};