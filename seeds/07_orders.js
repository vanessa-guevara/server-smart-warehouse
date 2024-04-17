exports.seed = async function (knex) {

  await knex('orderdetails').del()
  await knex('order').del()

  const orderIds = await knex('order').insert([
    {
      OrderID: 1,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Sales',
      WarehouseID: 11,
      BusinessPartnerCode: 'BP001',
      BusinessPartnerName: 'Acme Corporation',
      Address: '123 Main St',
      City: 'Metropolis',
      Country: 'USA'
    },
    {
      OrderID: 2,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Sales',
      WarehouseID: 11,
      BusinessPartnerCode: 'BP002',
      BusinessPartnerName: 'Globex Corporation',
      Address: '456 Elm St',
      City: 'Springfield',
      Country: 'USA'
    },
    {
      OrderID: 3,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Sales',
      WarehouseID: 11,
      BusinessPartnerCode: 'BP003',
      BusinessPartnerName: 'Soylent Corp',
      Address: '789 Pine St',
      City: 'Hill Valley',
      Country: 'USA'
    },
    {
      OrderID: 4,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Purchase',
      WarehouseID: 11,
      BusinessPartnerCode: 'BP004',
      BusinessPartnerName: 'Initech',
      Address: '101 Maple Ave',
      City: 'South Park',
      Country: 'USA'
    },
    {
      OrderID: 5,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Purchase',
      WarehouseID: 11,
      BusinessPartnerCode: 'BP005',
      BusinessPartnerName: 'Umbrella Corporation',
      Address: '202 Oak Rd',
      City: 'Raccoon City',
      Country: 'USA'
    },
    {
      OrderID: 6,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Purchase',
      WarehouseID: 11,
      BusinessPartnerCode: 'BP006',
      BusinessPartnerName: 'Vandelay Industries',
      Address: '303 Birch St',
      City: 'New York',
      Country: 'USA'
    },
    {
      OrderID: 7,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Sales',
      WarehouseID: 13,
      BusinessPartnerCode: 'BP007',
      BusinessPartnerName: 'Stark Industries',
      Address: '404 Cedar Blvd',
      City: 'Malibu',
      Country: 'USA'
    },
    {
      OrderID: 8,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Sales',
      WarehouseID: 13,
      BusinessPartnerCode: 'BP008',
      BusinessPartnerName: 'Wayne Enterprises',
      Address: '505 Palm Way',
      City: 'Gotham City',
      Country: 'USA'
    },
    {
      OrderID: 9,
      OrderDate: '2024-04-06',
      LogisticDate: '2024-04-07',
      Status: 'Open',
      Type: 'Purchase',
      WarehouseID: 14,
      BusinessPartnerCode: 'BP009',
      BusinessPartnerName: 'Weyland-Yutani',
      Address: '606 Spruce Ln',
      City: 'Los Angeles',
      Country: 'USA'
    }
  ])


  const details = [

    { OrderID: 9, Quantity: 5, ItemID: 1, openQty: 5, ItemName: 'Basic T-Shirt' },
    { OrderID: 9, Quantity: 3, ItemID: 2, openQty: 3, ItemName: 'Graphic T-Shirt' },
    { OrderID: 9, Quantity: 2, ItemID: 3, openQty: 2, ItemName: 'Jeans' },
    { OrderID: 9, Quantity: 4, ItemID: 4, openQty: 4, ItemName: 'Chinos' },
    { OrderID: 9, Quantity: 6, ItemID: 5, openQty: 6, ItemName: 'Pullover Sweater' },
  

    { OrderID: 1, Quantity: 3, ItemID: 1, openQty: 3, ItemName: 'Basic T-Shirt' },
    { OrderID: 1, Quantity: 2, ItemID: 2, openQty: 2, ItemName: 'Graphic T-Shirt' },
    { OrderID: 1, Quantity: 4, ItemID: 3, openQty: 4, ItemName: 'Jeans' },
    { OrderID: 1, Quantity: 5, ItemID: 4, openQty: 5, ItemName: 'Chinos' },
    { OrderID: 1, Quantity: 1, ItemID: 5, openQty: 1, ItemName: 'Pullover Sweater' },
  
    { OrderID: 2, Quantity: 4, ItemID: 1, openQty: 4, ItemName: 'Basic T-Shirt' },
    { OrderID: 2, Quantity: 5, ItemID: 2, openQty: 5, ItemName: 'Graphic T-Shirt' },
    { OrderID: 2, Quantity: 2, ItemID: 3, openQty: 2, ItemName: 'Jeans' },
    { OrderID: 2, Quantity: 3, ItemID: 4, openQty: 3, ItemName: 'Chinos' },
    { OrderID: 2, Quantity: 1, ItemID: 5, openQty: 1, ItemName: 'Pullover Sweater' },
  
    { OrderID: 3, Quantity: 5, ItemID: 1, openQty: 5, ItemName: 'Basic T-Shirt' },
    { OrderID: 3, Quantity: 3, ItemID: 2, openQty: 3, ItemName: 'Graphic T-Shirt' },
    { OrderID: 3, Quantity: 2, ItemID: 3, openQty: 2, ItemName: 'Jeans' },
    { OrderID: 3, Quantity: 4, ItemID: 4, openQty: 4, ItemName: 'Chinos' },
    { OrderID: 3, Quantity: 6, ItemID: 5, openQty: 6, ItemName: 'Pullover Sweater' },
  
    { OrderID: 4, Quantity: 3, ItemID: 1, openQty: 3, ItemName: 'Basic T-Shirt' },
    { OrderID: 4, Quantity: 2, ItemID: 2, openQty: 2, ItemName: 'Graphic T-Shirt' },
    { OrderID: 4, Quantity: 4, ItemID: 3, openQty: 4, ItemName: 'Jeans' },
    { OrderID: 4, Quantity: 5, ItemID: 4, openQty: 5, ItemName: 'Chinos' },
    { OrderID: 4, Quantity: 1, ItemID: 5, openQty: 1, ItemName: 'Pullover Sweater' },
  
    { OrderID: 5, Quantity: 4, ItemID: 1, openQty: 4, ItemName: 'Basic T-Shirt' },
    { OrderID: 5, Quantity: 5, ItemID: 2, openQty: 5, ItemName: 'Graphic T-Shirt' },
    { OrderID: 5, Quantity: 2, ItemID: 3, openQty: 2, ItemName: 'Jeans' },
    { OrderID: 5, Quantity: 3, ItemID: 4, openQty: 3, ItemName: 'Chinos' },
    { OrderID: 5, Quantity: 1, ItemID: 5, openQty: 1, ItemName: 'Pullover Sweater' },
  
    { OrderID: 6, Quantity: 5, ItemID: 1, openQty: 5, ItemName: 'Basic T-Shirt' },
    { OrderID: 6, Quantity: 3, ItemID: 2, openQty: 3, ItemName: 'Graphic T-Shirt' },
    { OrderID: 6, Quantity: 2, ItemID: 3, openQty: 2, ItemName: 'Jeans' },
    { OrderID: 6, Quantity: 4, ItemID: 4, openQty: 4, ItemName: 'Chinos' },
    { OrderID: 6, Quantity: 6, ItemID: 5, openQty: 6, ItemName: 'Pullover Sweater' },
  
    { OrderID: 7, Quantity: 3, ItemID: 1, openQty: 3, ItemName: 'Basic T-Shirt' },
    { OrderID: 7, Quantity: 2, ItemID: 2, openQty: 2, ItemName: 'Graphic T-Shirt' },
    { OrderID: 7, Quantity: 4, ItemID: 3, openQty: 4, ItemName: 'Jeans' },
    { OrderID: 7, Quantity: 5, ItemID: 4, openQty: 5, ItemName: 'Chinos' },
    { OrderID: 7, Quantity: 1, ItemID: 5, openQty: 1, ItemName: 'Pullover Sweater' },
  
    { OrderID: 8, Quantity: 4, ItemID: 1, openQty: 4, ItemName: 'Basic T-Shirt' },
    { OrderID: 8, Quantity: 5, ItemID: 2, openQty: 5, ItemName: 'Graphic T-Shirt' },
    { OrderID: 8, Quantity: 2, ItemID: 3, openQty: 2, ItemName: 'Jeans' },
    { OrderID: 8, Quantity: 3, ItemID: 4, openQty: 3, ItemName: 'Chinos' },
    { OrderID: 8, Quantity: 1, ItemID: 5, openQty: 1, ItemName: 'Pullover Sweater' }
  ];

  
  await knex('orderdetails').insert(details)
}
