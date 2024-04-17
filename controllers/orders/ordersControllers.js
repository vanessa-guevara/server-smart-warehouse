const db = require('knex')(require('../../knexfile'))

// sales order List

const salesOrdersList = async (_req, res) => {
  try {
    const data = await db
      .select('order.*', 'warehouses.WarehouseName')
      .from('order')
      .innerJoin('warehouses', 'warehouses.WarehouseID', 'order.WarehouseID')
      .where('order.Type', 'Sales')

    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving sales orders: ${err}`)
  }
}

// purchase order List

const purchaseOrdersList = async (_req, res) => {
  try {
    const data = await db
      .select('order.*', 'warehouses.WarehouseName')
      .from('order')
      .innerJoin('warehouses', 'warehouses.WarehouseID', 'order.WarehouseID')

      .where('order.Type', 'Purchase')

    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving purchase orders: ${err}`)
  }
}

// order detail by id
const findOneOrder = async (_req, res) => {
  try {
    const data = await db
      .select('order.*', 'orderdetails.*','warehouses.WarehouseName')
      .from('order')
      .innerJoin('orderdetails', 'order.OrderID', 'orderdetails.OrderID')
      .innerJoin('warehouses', 'warehouses.WarehouseID', 'order.WarehouseID')
      .where('order.OrderID', _req.params.id)

    if (data.length === 0) {
      return res.status(200).json({
        message: `Order with ID ${_req.params.id} not found`
      })
    }

    const order = {
      OrderID: data[0].OrderID,
      OrderDate: data[0].OrderDate,
      LogisticDate: data[0].LogisticDate,
      Status: data[0].Status,
      Type: data[0].Type,
      WarehouseID: data[0].WarehouseID,
      BusinessPartnerCode: data[0].BusinessPartnerCode,
      BusinessPartnerName: data[0].BusinessPartnerName,
      Address: data[0].Address,
      City: data[0].City,
      Country: data[0].Country,
      WarehouseName:data[0].WarehouseName,
    }

    const orderdetails = data.map(row => ({
      ItemID: row.ItemID,
      ItemName: row.ItemName,
      Quantity: row.Quantity,
      DetailID: row.DetailID,
      Status: row.Status,
      openQty: row.openQty
    }))

    const responseData = {
      order: order,
      orderdetails: orderdetails
    }

    res.json(responseData)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Unable to retrieve order with ID ${_req.params.id}`
    })
  }
}

//add
const add = async (_req, res) => {
  // Extracting order and orderDetails from the request body
  const { order, orderDetails } = _req.body

  try {
    // Starting a transaction
    const result = await db.transaction(async trx => {
   
      const [orderId] = await trx('order').insert(order, 'id')

      
      const detailsWithOrderId = orderDetails.map(detail => ({
        ...detail,
        orderId: orderId 
      }))


      await trx('orderdetails').insert(detailsWithOrderId)

    
      return orderId
    })

   
    res.json({
      success: true,
      orderId: result,
      message: 'Order and details successfully created.'
    })
  } catch (error) {
    // In case of an error, send an error response
    res.status(500).json({
      success: false,
      message: 'Error creating order and details',
      error: error.message
    })
  }
}

//update
const update = async (_req, res) => {
  const { orderId, order, orderDetails } = _req.body

  try {
    await db.transaction(async trx => {
      await trx('order').where('id', orderId).update(order)

      await trx('orderdetails').where('orderId', orderId).del()

      const detailsWithOrderId = orderDetails.map(detail => ({
        ...detail,
        orderId: orderId 
      }))

   
      await trx('orderdetails').insert(detailsWithOrderId)
    })

    
    res.json({
      success: true,
      message: 'Order and details successfully updated.'
    })
  } catch (error) {
 
    res.status(500).json({
      success: false,
      message: 'Error updating order and details',
      error: error.message
    })
  }
}

//remove
const remove = async (_req, res) => {
  const { orderId } = _req.body 

  try {
    await db.transaction(async trx => {
     
      await trx('orderdetails').where('orderId', orderId).del()

      
      await trx('order').where('id', orderId).del()
    })


    res.json({
      success: true,
      message: 'Order and details successfully removed.'
    })
  } catch (error) {
   
    res.status(500).json({
      success: false,
      message: 'Error removing order and details',
      error: error.message
    })
  }
}
module.exports = {
  salesOrdersList,
  purchaseOrdersList,
  findOneOrder,
  add,
  update,
  remove
}
