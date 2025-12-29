"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Song, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Username sudah terdaftar" },
        validate: {
          notNull: { msg: "Username tdak boleh kosong" },
          notEmpty: { msg: "Username tdak boleh kosong" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email sudah terdaftar" },
        validate: {
          notNull: { msg: "Email tdak boleh kosong" },
          notEmpty: { msg: "Email tdak boleh kosong" },
          isEmail: { msg: "Format email salah" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Email tdak boleh kosong" },
          notEmpty: { msg: "Email tdak boleh kosong" },
        },
        len: {
          args: [5],
          msg: "Password minimal 5 karakter",
        },
      },
      role: { type: DataTypes.STRING, defaultValue: "Staff" },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        },
      },
    }
  );
  return User;
};
