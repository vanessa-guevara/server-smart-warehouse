exports.up = async function(knex) {
  return knex.schema.createTable('warehouses', function(table) {
    table.increments('WarehouseID').primary();
    table.string('WarehouseName', 255).notNullable();
    table.string('Address', 255).notNullable();
    table.string('City', 255).notNullable();
    table.string('Country', 255).notNullable();
    table.integer('UserID').unsigned().nullable(); // Ahora el campo UserID puede ser nulo
    table.foreign('UserID').references('UserID').inTable('users').onDelete('SET NULL'); // Eliminamos la restricción 'notNullable'
    table.timestamp('CreatedAt').defaultTo(knex.fn.now());
    table.timestamp('UpdatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('warehouses');
};
