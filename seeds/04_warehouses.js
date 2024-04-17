/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('warehouses').del();

  // Inserts seed entries
  return knex('warehouses').insert([
    {
        WarehouseID: "11",
        WarehouseName: "Central Warehouse",
        Address: "123 Central Ave",
        City: "Centerville",
        Country: "Anyland"
    },
    {
        WarehouseID: "12",
        WarehouseName: "East Side Storage",
        Address: "456 Eastside Blvd",
        City: "Easton",
        Country: "Anyland"
    },
    {
        WarehouseID: "13",
        WarehouseName: "West End Distribution",
        Address: "789 Westend Rd",
        City: "Westville",
        Country: "Anyland"
    },
    {
        WarehouseID: "14",
        WarehouseName: "South Gate Fulfillment",
        Address: "101 Southgate St",
        City: "Southtown",
        Country: "Anyland"
    },
    {
        WarehouseID: "15",
        WarehouseName: "North Hub Logistics",
        Address: "202 Northhub Ave",
        City: "Northville",
        Country: "Anyland"
    }
]
);
};
