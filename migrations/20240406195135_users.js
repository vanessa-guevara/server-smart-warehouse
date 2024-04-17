exports.up = async function(knex) {
    return knex.schema.createTable('users', function(table) {
      table.increments('UserID');
      table.string('User', 255).notNullable().unique();
      table.string('Username', 255).notNullable();
      table.string('Password', 255).notNullable();
      table.enu('Role', [ 'Warehouse Manager', 'Administrator', 'Logistic']).notNullable();
      table.timestamp('CreatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  