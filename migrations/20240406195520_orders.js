exports.up =  async function(knex) {
  return knex.schema
    .createTable('order', function(table) {
      table.increments('OrderID').primary();
      table.date('OrderDate').notNullable();
      table.date('LogisticDate').notNullable();
      table.enu('Status', ['Open', 'Closed', 'Cancelled']).defaultTo('Open');
      table.enu('Type', ['Sales', 'Purchase']);
      table.timestamp('CreatedAt').defaultTo(knex.fn.now());
      table.integer('WarehouseID').unsigned();
      table.foreign('WarehouseID').references('WarehouseID').inTable('warehouses');
      table.string('BusinessPartnerCode', 100); 
      table.string('BusinessPartnerName', 255); 
      table.string('Address', 255); 
      table.string('City', 100); 
      table.string('Country', 100);
    })
    .then(function() {
      return knex.schema.createTable('orderdetails', function(table) {
        table.increments('DetailID').primary(); 
        table.integer('OrderID').unsigned().notNullable(); 
        table.foreign('OrderID').references('OrderID').inTable('order'); 
        table.integer('Quantity').notNullable();
        table.timestamp('CreatedAt').defaultTo(knex.fn.now());
        table.string('ItemName', 255).nullable();
        table.enu('Status', ['Open', 'Closed']).defaultTo('Open');
        table.integer('ItemID').unsigned();
        table.foreign('ItemID').references('ItemID').inTable('items');
        table.integer('openQty').notNullable();
      });
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('orderdetails')
    .then(function() {
      return knex.schema.dropTable('order');
    });
};
