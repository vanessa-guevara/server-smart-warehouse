exports.up = async function (knex) {
  return knex.schema.createTable('warehouselocations', function(table) {
    table.increments('LocationID').primary();
    table.string('LocationCode', 50).notNullable();
    table.timestamp('CreatedAt').defaultTo(knex.fn.now());
    table.timestamp('UpdatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table.integer('WarehouseID').unsigned().notNullable();
    table.foreign('WarehouseID').references('WarehouseID').inTable('warehouses');
    table.integer('Stock').unsigned().notNullable().defaultTo(0); 
    table.index('WarehouseID');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('warehouselocations');
};
