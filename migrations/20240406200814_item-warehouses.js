
exports.up = async function(knex) {
    return knex.schema.createTable('items_has_warehouses', function(table) {
      table.integer('ItemID').unsigned().notNullable();
      table.integer('WarehouseID').unsigned().notNullable();
      table.integer('locationDefaultID').nullable();
  
     
      table.primary(['ItemID', 'WarehouseID']);
  
     
      table.foreign('ItemID').references('ItemID').inTable('items');
      table.foreign('WarehouseID').references('WarehouseID').inTable('warehouses');
  
      
      table.index('ItemID', 'fk_items_has_warehouses_items1_idx');
      table.index('WarehouseID', 'fk_items_has_warehouses_warehouses1_idx');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('items_has_warehouses');
  };
  

