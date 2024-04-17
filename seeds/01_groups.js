/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  
  await knex('itemsgroup').del();

  await knex('itemsgroup').insert([
    { GroupCode: 'TS', GroupName: 'T-Shirts' },
    { GroupCode: 'PS', GroupName: 'Pants & Shorts' },
    { GroupCode: 'SW', GroupName: 'Sweaters' },
    { GroupCode: 'DR', GroupName: 'Dresses' },
    { GroupCode: 'OW', GroupName: 'Outerwear' }, 
    { GroupCode: 'FT', GroupName: 'Footwear' },
    { GroupCode: 'AC', GroupName: 'Accessories' }
  ]);
};
