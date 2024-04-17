exports.up = async function(knex) {
    return knex.schema
      .createTable('picking_lists', function(table) {
        table.increments('PickingListID').primary();
        table.integer('OrderID').unsigned();
        table.integer('WarehouseID').unsigned();
        table.dateTime('CreatedDate').defaultTo(knex.fn.now());
        table.string('Status');
        table.dateTime('CompletedDate').nullable();
  
        // Definir claves foráneas
        table.foreign('OrderID').references('OrderID').inTable('order');
        table.foreign('WarehouseID').references('WarehouseID').inTable('warehouses');
      })
      .then(() => {
        return knex.schema.createTable('picking_list_items', function(table) {
          table.increments('PickingListItemID').primary();
          table.integer('PickingListID').unsigned();
          table.integer('ItemID').unsigned();
          table.integer('Quantity');
          table.integer('LocationID').unsigned().nullable();
          table.integer('PickedQuantity').defaultTo(0);
  
        
          table.foreign('PickingListID').references('PickingListID').inTable('picking_lists');
          table.foreign('ItemID').references('ItemID').inTable('items');
          table.foreign('LocationID').references('LocationID').inTable('warehouselocations');
        });
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('picking_list_items')
      .dropTableIfExists('picking_lists');
  };
  
