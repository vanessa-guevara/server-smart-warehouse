exports.up = async function(knex) {
    return knex.schema.createTable('settings', function(table) {
      table.increments('settingsID');
      table.enu('Type', ['General', 'Articles']).notNullable();
      table.boolean('Batch').defaultTo(true);
      table.boolean('Serial').defaultTo(true);
      table.timestamp('Logo').defaultTo(knex.fn.now());
      table.timestamp('CreatedAt').defaultTo(knex.fn.now());
      table.timestamp('UpdatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('settings');
  };
  