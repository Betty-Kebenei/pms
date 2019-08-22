'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: DataTypes.STRING,
    males: DataTypes.INTEGER,
    females: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER
  }, {});
  Location.associate = function(models) {
    Location.belongsTo(models.Location, {
      foreignKey: 'parent_id',
      targetKey: 'id'
    })
  };
  return Location;
};
