const Authorization = require('../service/auth');
const disconnect = require('./disconnect');
const socketCfg = require('../config/socket');
const config = require('../config/config')
const fs = require('../../libs/fs');

module.exports = async (token, socket) => {
    try {

        let authorization = new Authorization();

        let patientInfo = await authorization.getPatientInfo(token);

        let patients = fs.find(__dirname, config.DB);

        let check = patients.find(patient => {
            return patient.patientInfo.id === patientInfo.data.id;
        });;

        if (!check) {
            patients.push({
                patientInfo: patientInfo.data,
                socketId: [socket.id]
            });

        } else {
            check.socketId.push(socket.id);

        }

        fs.write(__dirname, config.DB, patients);
        console.log(patients)
        socket.join(socketCfg.room(patientInfo.data.email));

        socket.on('disconnect', () => {
            disconnect(patientInfo.data, socket);
            
        });
    } catch (error) {
        console.log(error);
    }
}