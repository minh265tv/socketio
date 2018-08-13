const validator = require("validator");
const underscore = require("underscore");

const FuncValidate = {
    required: (value) => {
        let result = false;
        if (value.toString().trim().length > 0) {
            result = true;
        }
        return result;
    },
    min: (value, length) => {
        let result = false;
        if (value.length >= length) {
            return true;
        }
        return result;
    },
    max: (value, length) => {
        let result = false;
        if (value.length <= length) {
            return true;
        }
        return result;
    },
    email: (value) => {
        let result = false;
        if (validator.isEmail(value)) {
            result = true;
        }
        return result;
    },
    numeric: (value) => {
        let result = false;
        if (validator.isNumeric(value)) {
            result = true;
        }
        return result;
    },
    execValidate: (value, strFuncParams) => {
        let info = strFuncParams.split(':');
        let funcName = info[0];
        let funcParams = [];
        if (info[1]) {
            funcParams = info[1].split(',');
        }
        let result = true;
        switch (funcName) {
            case 'required':
                result = FuncValidate.required(value);
                break;
            case 'min':
                result = FuncValidate.min(value, funcParams[0]);
                break;
            case 'max':
                result = FuncValidate.max(value, funcParams[0]);
                break;
            case 'email':
                result = FuncValidate.email(value);
                break;
            case 'numeric':
                result = FuncValidate.numeric(value);
                break;
        }

        return result;
    }
};

class MyErrors {
    constructor(errors) {
        this.errors = errors || {};
    }

    fails() {
        return (Object.keys(this.errors).length);
    }

    messages() {
        return this.buildError(this.errors);
    }

    buildError() {
        let result = this.errors;
        let typeofValue = '';
        for (var key in this.errors) {
            typeofValue = typeof this.errors[key];
            switch (typeofValue) {
                case 'array':
                    this.errors[key] = this.errors[key][0]
                    break;
            }
            result[key] = this.errors[key];
        }
        return result;
    }
}

const MyValidate = (values, arrCheck, arrMessage) => {
    let errors = {};
    let listFunc = [];
    let tmpFuncName = '';
    let tmpValue = '';
    underscore.each(arrCheck, (cond, key) => {
        listFunc = cond.split('|');
        tmpValue = values[key] || '';
        underscore.each(listFunc, (strFuncParams) => {
            tmpFuncName = strFuncParams.split(':')[0];
            if (!FuncValidate.execValidate(tmpValue, strFuncParams)) {//neu gia tri ko hop le
                if (!errors[key]) {
                    errors[key] = arrMessage[key + '.' + tmpFuncName] || '';
                }
            }
        });
    });
    return new MyErrors(errors);
}

module.exports = MyValidate;