'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Players', [
     
     {
      name: 'Player 1',
      createdAt: new Date(),
      updatedAt: new Date()
    },
     {
      name: 'Player 2',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Players', null, {});
  }
};
