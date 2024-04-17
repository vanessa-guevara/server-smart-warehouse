exports.up = async function (knex) {
  return knex.schema
    .createTable('inventory_transactions', function (table) {
      table.increments('ID').primary()
      table.enu('Status', ['Closed', 'Cancelled']).defaultTo('Closed')
      table.enu('Type', ['In', 'Out'])
      table.timestamp('CreatedAt').defaultTo(knex.fn.now())
      table.string('TransportCode', 255).nullable()
      table.string('BusinessPartnerCode', 100)
      table.string('BusinessPartnerName', 255)
      table.string('Address', 255)
      table.string('City', 100)
      table.string('Country', 100)
      table.string('Comments', 100)
      table.integer('OrderID').unsigned()
      table.foreign('OrderID').references('OrderID').inTable('order')
      table.integer('WarehouseID').unsigned()
      table
        .foreign('WarehouseID')
        .references('WarehouseID')
        .inTable('warehouses')
    })
    .then(function () {
      return knex.schema.createTable(
        'inventory_transactions_details',
        function (table) {
          table.increments('DetailID').primary()
          table.integer('TransactionID').unsigned().notNullable()
          table
            .foreign('TransactionID')
            .references('ID')
            .inTable('inventory_transactions')
          table.timestamp('CreatedAt').defaultTo(knex.fn.now())
          table.string('ItemCode', 255).nullable()
          table.integer('ItemID').unsigned()
          table.string('ItemName', 255).nullable();
          table.foreign('ItemID').references('ItemID').inTable('items')
          table.integer('Quantity')
          table.integer('OrderDetailID').unsigned()
          table.integer('LocationID').unsigned().nullable()
          table
            .foreign('LocationID')
            .references('LocationID')
            .inTable('warehouselocations')
        }
      )
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTable('inventory_transactions_details')
    .then(function () {
      return knex.schema.dropTable('inventory_transactions')
    })
}
