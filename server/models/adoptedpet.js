'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdoptedPet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AdoptedPet.belongsTo(models.User, {foreignKey: 'UserId'})
      AdoptedPet.belongsTo(models.Pet, {foreignKey: 'PetId'})
    }
  }
  AdoptedPet.init({
    PetId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AdoptedPet',
  });
  return AdoptedPet;
};