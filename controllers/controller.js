const db = require('../models');
module.exports = class controller{
    constructor(){
        this.model = db;
    }
}