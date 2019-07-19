const addPatient = require('./addPatient');
const socketCfg = require('../config/socket');

module.exports = {

    login: () => {
        global.io.on('connection', (socket) => {
            socket.on(socketCfg.addPatient, async (token) => {
                await addPatient(token.accessToken, socket);
            });
        });
    },
    sendMessage: (data) => {
        global.io.to(socketCfg.room(data.email)).emit(socketCfg.sendMessage, data);
    }
}