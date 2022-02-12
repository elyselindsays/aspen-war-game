'use strict';
module.exports = (sequelize, DataTypes) => {
  const Winner = sequelize.define('Winner', {
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Winner.associate = function(models) {
    Winner.belongsTo(models.Player, {foreignKey: 'playerId'})
  };
  return Winner;
};