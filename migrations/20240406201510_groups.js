exports.up = async function(knex) {
  return knex.schema.createTable('itemsgroup', function(table) {
    table.string('GroupCode', 10).primary();
    table.string('GroupName', 255).notNullable();
    table.unique('GroupName'); 
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('itemsgroup');
};

