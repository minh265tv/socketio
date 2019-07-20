
const config = require('../config/config')
const fs = require('../../libs/fs');

module.exports = (patientInfo, socket) => {

    let patients = fs.find(__dirname, config.DB);

    let patientSocket = patients.find(patient => {
        return patient.patientInfo.id == patientInfo.id;
    });
    if (patientSocket) {
        if (patientSocket.socketId.length > 1) {
            patientSocket.socketId = patientSocket.socketId.filter((id) => {
                return id != socket.id;
            });

        } else {
            patients = patients.filter((patient) => {
                return patient.patientInfo.id != patientSocket.patientInfo.id;
            });
        }
    }

    fs.write(__dirname, config.DB, patients);
    console.log(patients)
}