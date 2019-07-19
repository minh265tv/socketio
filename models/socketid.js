'use strict';
module.exports = (sequelize, DataTypes) => {
  const socketId = sequelize.define('socketids', {
    id_socket: DataTypes.STRING,
    id_patient: DataTypes.INTEGER
  }, {});
  socketId.associate = function(models) {
    // associations can be defined here
  };
  return socketId;
};