/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    return knex.schema.createTable('items', function(table) {
      table.increments('ItemID').primary(); 
      table.string('ItemCode', 255).notNullable(); 
      table.string('ItemName', 255).notNullable(); 
      table.string('Unit', 50).notNullable(); 
      table.string('Weight', 50).nullable(); 
      table.timestamp('CreatedAt').defaultTo(knex.fn.now()); 
      table.timestamp('UpdatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
      table.integer('TotalStock').nullable(); 
      table.string('GroupCode', 255).nullable(); 
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('items');
  };
  






