exports.up = async function(knex) {
    return knex.schema.createTable('transports', function(table) {
      table.increments('TransportID');
      table.string('TransportCode', 50).notNullable();
      table.string('TransportName', 255).notNullable();
      table.timestamp('CreatedAt').defaultTo(knex.fn.now());
      table.timestamp('UpdatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transports');
  };
  