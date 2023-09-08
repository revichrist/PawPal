"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.hasOne(models.AdoptedPet, { foreignKey: "PetId" });
      Pet.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Pet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   notEmpty: {
        //     args: true,
        //     msg: "Pet name is required",
        //   },
        //   notNull: {
        //     args: true,
        //     msg: "Pet name is required",
        //   },
        // },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   notEmpty: {
        //     args: true,
        //     msg: "Pet type is required",
        //   },
        //   notNull: {
        //     args: true,
        //     msg: "Pet type is required",
        //   },
        // },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate: {
        //   notEmpty: {
        //     args: true,
        //     msg: "Pet gender is required",
        //   },
        //   notNull: {
        //     args: true,
        //     msg: "Pet gender is required",
        //   },
        // },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
      weight: DataTypes.FLOAT,
      isNeutered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Neuter status is required",
          },
          notNull: {
            args: true,
            msg: "Neuter status is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          minimumFiveWords(value) {
            if (value.split(" ").length < 5)
              throw new Error("Description minimum 5 words");
          },
        },
      },
      age: DataTypes.INTEGER,
      status: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
