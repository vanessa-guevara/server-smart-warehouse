/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {

  const hash1 = await bcrypt.hash('1234567890', 10);

  
  await knex('users').del()

    await knex('users').insert([
      { User: 'manager', Username: 'Managaer', Password: hash1, Role: 'Administrator' },
      { User: 'vane17', Username: 'Vanessa Guevara', Password: hash1, Role: 'Warehouse Manager' },
      { User: 'logistic', Username: 'logistic', Password: hash1, Role: 'Logistic' }
    ]);
    
  
};
