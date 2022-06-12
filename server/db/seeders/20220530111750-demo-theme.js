module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Themes', [{
      theme: 'Для вечеринок',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Викторины',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Детективы',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Детские',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Дуэльные',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Квесты',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Книги-игры',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Политические',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Приключения',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      theme: 'Экономические',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Theme', null, {});
  },
};
