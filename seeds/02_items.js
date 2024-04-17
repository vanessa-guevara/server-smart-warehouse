/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  await knex('items').del();


  await knex('items').insert([
    { ItemID:'1', ItemCode: 'TS100', ItemName: 'Basic T-Shirt', Unit: 'pcs', Weight: '0.2', GroupCode: 'TS' ,TotalStock:225},
    { ItemID:'2',ItemCode: 'TS101', ItemName: 'Graphic T-Shirt', Unit: 'pcs', Weight: '0.25', GroupCode: 'TS',TotalStock:305 },
    { ItemID:'3', ItemCode:'PS100', ItemName: 'Jeans', Unit: 'pcs', Weight: '0.5', GroupCode: 'PS',TotalStock:250 },
    { ItemID:'4',ItemCode: 'PS101', ItemName: 'Chinos', Unit: 'pcs', Weight: '0.4', GroupCode: 'PS',TotalStock:360 },
    { ItemID:'5',ItemCode: 'SW100', ItemName: 'Pullover Sweater', Unit: 'pcs', Weight: '0.3', GroupCode: 'SW' ,TotalStock:230},
    { ItemID:'6',ItemCode: 'DR100', ItemName: 'Casual Dress', Unit: 'pcs', Weight: '0.4', GroupCode: 'DR',TotalStock:310 },
    { ItemID:'7',ItemCode: 'DR101', ItemName: 'Evening Dress', Unit: 'pcs', Weight: '0.6', GroupCode: 'DR' ,TotalStock:390},
    { ItemID:'8',ItemCode: 'OW100', ItemName: 'Denim Jacket', Unit: 'pcs', Weight: '0.8', GroupCode: 'OW',TotalStock:470 },
    { ItemID:'9',ItemCode: 'OW101', ItemName: 'Leather Jacket', Unit: 'pcs', Weight: '1.0', GroupCode: 'OW' ,TotalStock:550},
    { ItemID:'10',ItemCode: 'FT100', ItemName: 'Sneakers', Unit: 'pair', Weight: '0.6', GroupCode: 'FT' ,TotalStock:630},
    { ItemID:'11',ItemCode: 'FT101', ItemName: 'Boots', Unit: 'pair', Weight: '1.2', GroupCode: 'FT',TotalStock:0 },
    { ItemID:'12',ItemCode: 'AC100', ItemName: 'Baseball Cap', Unit: 'pcs', Weight: '0.1', GroupCode: 'AC',TotalStock:0 },
    { ItemID:'13',ItemCode: 'AC101', ItemName: 'Belt', Unit: 'pcs', Weight: '0.2', GroupCode: 'AC',TotalStock:0 },
    { ItemID:'14',ItemCode: 'AC102', ItemName: 'Sunglasses', Unit: 'pcs', Weight: '0.05', GroupCode: 'AC',TotalStock:0 },
    { ItemID:'15',ItemCode: 'AC103', ItemName: 'Scarf', Unit: 'pcs', Weight: '0.1', GroupCode: 'AC',TotalStock:0 }
  ]);
};
