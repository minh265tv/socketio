const Authorization = require('../service/auth');
const disconnect = require('./disconnect');
const socketCfg = require('../config/socket');
const config = require('../config/config')
const fs = require('../../libs/fs');

const getPatient = async (token) => {
    try {
        let authorization = new Authorization();
        let patientInfo = await authorization.getPatientInfo(token);
        let { id, name, email } = patientInfo.data;
        return { id, name, email };
    } catch (error) {
        console.log(error);
    }
}

const addPatient = (patientInfo, socket) => {
    let patients = fs.find(__dirname, config.DB);

    let check = patients.find(patient => {
        return patient.patientInfo.id === patientInfo.id;
    });;

    if (!check) {
            patients.push({
                patientInfo: patientInfo,
                socketId: [socket.id]
            });
    } else {
        let check1 = check.socketId.find(id => {
            return id === socket.id
        });
        if(!check1)
            check.socketId.push(socket.id);

    }

    fs.write(__dirname, config.DB, patients);
    console.log(patients)
}


module.exports = async (token, socket) => {
    let patientInfo = await getPatient(token);
    addPatient(patientInfo, socket);

    socket.join(socketCfg.room(patientInfo.email));

    socket.on('disconnect', () => {
        disconnect(patientInfo, socket);
    });
}