let config = {};
let authorizationUrl = 'https://auth.newtel.com.vn/api/v1/';

config.DB = 'DB.json';

config.service = {
    authorization: () => {
        return authorizationUrl + 'userInfo';
    }
}


module.exports = config;