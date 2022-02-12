'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    name: DataTypes.STRING
  }, {});
  Player.associate = function(models) {
    Player.hasMany(models.Winner, {foreignKey: 'playerId'})
  };
  return Player;
};