/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('item_locations').del();

  await knex('item_locations').insert([
   
    { ItemID: 1, LocationID: 1, Stock: 50 },
    { ItemID: 1, LocationID: 2, Stock: 75 },
    { ItemID: 1, LocationID: 3, Stock: 60 },
    { ItemID: 1, LocationID: 4, Stock: 40 },
    { ItemID: 2, LocationID: 5, Stock: 80 },
    { ItemID: 2, LocationID: 6, Stock: 65 },
    { ItemID: 2, LocationID: 7, Stock: 70 },
    { ItemID: 2, LocationID: 8, Stock: 90 },
    { ItemID: 3, LocationID: 9, Stock: 55 },
    { ItemID: 3, LocationID: 10, Stock: 60 },
    { ItemID: 3, LocationID: 11, Stock: 65 },
    { ItemID: 3, LocationID: 12, Stock: 70 },
    { ItemID: 4, LocationID: 13, Stock: 75 },
    { ItemID: 4, LocationID: 14, Stock: 85 },
    { ItemID: 4, LocationID: 15, Stock: 95 },
    { ItemID: 4, LocationID: 1, Stock: 105 },
    { ItemID: 5, LocationID: 2, Stock: 50 },
    { ItemID: 5, LocationID: 3, Stock: 55 },
    { ItemID: 5, LocationID: 4, Stock: 60 },
    { ItemID: 5, LocationID: 5, Stock: 65 },
    { ItemID: 6, LocationID: 6, Stock: 70 },
    { ItemID: 6, LocationID: 7, Stock: 75 },
    { ItemID: 6, LocationID: 8, Stock: 80 },
    { ItemID: 6, LocationID: 9, Stock: 85 },
    { ItemID: 7, LocationID: 10, Stock: 90 },
    { ItemID: 7, LocationID: 11, Stock: 95 },
    { ItemID: 7, LocationID: 12, Stock: 100 },
    { ItemID: 7, LocationID: 13, Stock: 105 },
    { ItemID: 8, LocationID: 14, Stock: 110 },
    { ItemID: 8, LocationID: 15, Stock: 115 },
    { ItemID: 8, LocationID: 1, Stock: 120 },
    { ItemID: 8, LocationID: 2, Stock: 125 },
    { ItemID: 9, LocationID: 3, Stock: 130 },
    { ItemID: 9, LocationID: 4, Stock: 135 },
    { ItemID: 9, LocationID: 5, Stock: 140 },
    { ItemID: 9, LocationID: 6, Stock: 145 },
    { ItemID: 10, LocationID: 7, Stock: 150 },
    { ItemID: 10, LocationID: 8, Stock: 155 },
    { ItemID: 10, LocationID: 9, Stock: 160 },
    { ItemID: 10, LocationID: 10, Stock: 165 }
  ]);
};
