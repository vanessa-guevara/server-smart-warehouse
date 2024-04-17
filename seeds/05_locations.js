/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  await knex('warehouselocations').del();


  await knex('warehouselocations').insert([
  
    { LocationID:'1',WarehouseID: 11, LocationCode: 'W1-A1', CreatedAt: new Date() },
    { LocationID:'2',WarehouseID: 11, LocationCode: 'W1-A2', CreatedAt: new Date() },
    { LocationID:'3',WarehouseID: 11, LocationCode: 'W1-A3', CreatedAt: new Date() },
    { LocationID:'4',WarehouseID: 11, LocationCode: 'W1-A4', CreatedAt: new Date() },
    { LocationID:'5',WarehouseID: 11, LocationCode: 'W1-A5', CreatedAt: new Date() },
    

    { LocationID:'6',WarehouseID: 12, LocationCode: 'W2-B1', CreatedAt: new Date() },
    { LocationID:'7',WarehouseID: 12, LocationCode: 'W2-B2', CreatedAt: new Date() },
    { LocationID:'8',WarehouseID: 12, LocationCode: 'W2-B3', CreatedAt: new Date() },
    { LocationID:'9',WarehouseID: 12, LocationCode: 'W2-B4', CreatedAt: new Date() },
    { LocationID:'10',WarehouseID: 12, LocationCode: 'W2-B5', CreatedAt: new Date() },
    
   
    { LocationID:'11',WarehouseID: 13, LocationCode: 'W3-C1', CreatedAt: new Date() },
    { LocationID:'12',WarehouseID: 13, LocationCode: 'W3-C2', CreatedAt: new Date() },
    { LocationID:'13',WarehouseID: 13, LocationCode: 'W3-C3', CreatedAt: new Date() },
    { LocationID:'14',WarehouseID: 13, LocationCode: 'W3-C4', CreatedAt: new Date() },
    { LocationID:'15',WarehouseID: 13, LocationCode: 'W3-C5', CreatedAt: new Date() },

   
    { LocationID:'16',WarehouseID: 14, LocationCode: 'W4-D1', CreatedAt: new Date() },
    { LocationID:'17',WarehouseID: 14, LocationCode: 'W4-D2', CreatedAt: new Date() },
    { LocationID:'18',WarehouseID: 14, LocationCode: 'W4-D3', CreatedAt: new Date() },
    { LocationID:'19',WarehouseID: 14, LocationCode: 'W4-D4', CreatedAt: new Date() },
    { LocationID:'20',WarehouseID: 14, LocationCode: 'W4-D5', CreatedAt: new Date() },

    { LocationID:'21',WarehouseID: 15, LocationCode: 'W5-E1', CreatedAt: new Date() },
    { LocationID:'22',WarehouseID: 15, LocationCode: 'W5-E2', CreatedAt: new Date() },
    { LocationID:'23',WarehouseID: 15, LocationCode: 'W5-E3', CreatedAt: new Date() },
    { LocationID:'24',WarehouseID: 15, LocationCode: 'W5-E4', CreatedAt: new Date() },
    { LocationID:'25',WarehouseID: 15, LocationCode: 'W5-E5', CreatedAt: new Date() },
  ]);
};
