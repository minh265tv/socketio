'use strict';
const model = require('./index');
module.exports = (sequelize, DataTypes) => {
  const patient = sequelize.define('patients', {
    id_patient: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
      scopes: {
        patientWithSockId: {
          include: [
            { model: model.socketid, where: { active: true } }
          ]
        }
      }
    });
  patient.associate = function (models) {

  };
  return patient;
};