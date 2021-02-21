'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Career extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Career.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    homeAddress1: DataTypes.STRING,
    homeAddress2: DataTypes.STRING,
    stateOfOrigin: DataTypes.STRING,
    qualification: DataTypes.STRING,
    workExp: DataTypes.STRING,
    interest: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Career',
  });
  return Career;
};