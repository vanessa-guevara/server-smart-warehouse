exports.up = async function(knex) {
  return knex.schema.createTable('users_has_warehouses', function(table) {
    table.integer('UserID').unsigned().notNullable();
    table.integer('WarehouseID').unsigned().notNullable();
    table.primary(['UserID', 'WarehouseID']);

    table.foreign('UserID').references('UserID').inTable('users');
    table.foreign('WarehouseID').references('WarehouseID').inTable('warehouses');

    table.index('WarehouseID', 'fk_users_has_warehouses_warehouses1_idx');
    table.index('UserID', 'fk_users_has_warehouses_users1_idx');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users_has_warehouses');
};
