"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = bcrypt.genSaltSync(10);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        username: "Label Manager",
        email: "admin@music.com",
        password: bcrypt.hashSync("admin", salt),
        role: "Admin",
        phoneNumber: "08123456788",
        address: "Kantor Pusat Label",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Rocket Rockers",
        email: "artist@music.com",
        password: bcrypt.hashSync("staff", salt),
        role: "Staff",
        phoneNumber: "08123456788",
        address: "Kantor Pusat Label",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
