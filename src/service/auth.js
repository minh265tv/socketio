const axios = require('axios');
const config = require('../config/config');

module.exports = class Authorization {

    _headerLogin(token) {
        return {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    getPatientInfo(token) {
        let url = config.service.authorization();
        return axios.get(url,{headers: this._headerLogin(token)});
    }
}