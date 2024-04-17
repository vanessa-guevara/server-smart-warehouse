exports.up = async function(knex) {
    return knex.schema.createTable('item_locations', function(table) {
      table.increments('id').primary(); 
      table.integer('ItemID').unsigned().notNullable();
      table.foreign('ItemID').references('ItemID').inTable('items'); 
      table.integer('LocationID').unsigned().notNullable();
      table.foreign('LocationID').references('LocationID').inTable('warehouselocations');
      table.integer('Stock').unsigned().notNullable().defaultTo(0); 
      table.unique(['ItemID', 'LocationID']); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('item_locations');
  };
  