



const db = require('knex')(require('../../knexfile'))

// delivery  list

const deliveryOrdersList = async (_req, res) => {
  
  try {

    const data = await db
      .select('inventory_transactions.*')
      .from('inventory_transactions')
      .where('inventory_transactions.Type', 'Out')

   
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving  deliveries: ${err}`)
  }
}



// delivery  list detail 

const deliveryItemsList = async (_req, res) => {
 
  try {
    
    const data = await db
      .select('inventory_transactions.*','inventory_transactions_details.*')
      .from('inventory_transactions')
      .innerJoin('inventory_transactions_details',
      'inventory_transactions_details.TransactionID',
      'inventory_transactions.ID')
      .where('inventory_transactions.Type', 'Out')

   
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving  deliveries: ${err}`)
  }
}
// purchase recip List

const purchaseOrdersList = async (_req, res) => {
  try {
    
    const data = await db
      .select('inventory_transactions.*','inventory_transactions_details.*')
      .from('inventory_transactions')
      .innerJoin('inventory_transactions_details',
      'inventory_transactions_details.TransactionID',
      'inventory_transactions.ID')
      .where('inventory_transactions.Type', 'In')

   
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving  deliveries: ${err}`)
  }
}




// order detail by id
const findOneOrder = async (_req, res) => {
  try {
    const data = await db
      .select('inventory_transactions.*', 'inventory_transactions_details.*')
      .from('inventory_transactions')
      .innerJoin('inventory_transactions_details','inventory_transactions.ID','inventory_transactions_details.TransactionID')
      .where('inventory_transactions.ID', _req.params.id)

    if (data.length === 0) {
      return res.status(200).json({
        message: `Inventory transaction with ID ${_req.params.id} not found`
      })
    }

    const order = {
      ID: data[0].ID,
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
      Comments: data[0].Comments
    }

    const orderdetails = data.map(row => ({
      ItemID: row.ItemID,
      ItemName: row.ItemName,
      Quantity: row.Quantity
    }))

    const responseData = {
      order: order,
      orderdetails: orderdetails
    }

    res.json(responseData)
  } catch (err) {
    
    res.status(500).json({
      message: `Unable to retrieve inventory transaction with ID ${_req.params.id}`
    })
  }
}

//add//////////////////////////////////

const add = async (_req, res) => {
  const { order, orderDetails } = _req.body;
  
  try {
    const transactionId = await db.transaction(async trx => {

      //add doc header
      const [Id] = await trx('inventory_transactions').insert(order, 'id');
      const detailsWithOrderId = orderDetails.map(detail => ({
        ...detail,
        TransactionID: Id 
      }));

      // add doc detail
      await trx('inventory_transactions_details').insert(detailsWithOrderId);
     
      // to update

      //for sales order to generate delivery
      if (order.Type === 'Out') {
        // check for sufficient stock in item locations
        for (const detail of detailsWithOrderId) {
          const locationStock = await trx('item_locations')
            .where({ 'ItemID': detail.ItemID, 'LocationID': detail.LocationID })
            .first();
      
          if (!locationStock || locationStock.Stock - detail.Quantity < 0) {
            console.log(`Insufficient stock for item ${detail.ItemID} at location ${detail.LocationID}`);
           
            return;
          }
        }
      
        //if stock is >0 then logic start
        for (const detail of detailsWithOrderId) {
          // Decrement stock at the item location
          await trx('item_locations')
            .where({ 'ItemID': detail.ItemID, 'LocationID': detail.LocationID })
            .decrement('item_locations.Stock', detail.Quantity);
          
          // Decrement total stock for the item
          await trx('items')
            .where('items.ItemID', detail.ItemID)
            .decrement('items.TotalStock', detail.Quantity);
      
          // Update base document
          console.log(detail.OrderDetailID);
          const baseOrderDetail = await trx('orderdetails')
            .where('DetailID', detail.OrderDetailID)
            .where('OrderID', order.OrderId)
            .first();
      
          console.log('Validate detail status');
          console.log(baseOrderDetail);
          console.log(detail.Quantity);
      
          // Always reduce the delivered quantity
          await trx('orderdetails')
            .where('DetailID', detail.OrderDetailID)
            .update({ 
              openQty: baseOrderDetail.openQty - detail.Quantity
            });
          console.log('VALIDATE STATUS');
          console.log(baseOrderDetail.openQty);
        
      
          if ((baseOrderDetail.openQty - detail.Quantity) === 0) {
            // Update the state
            await trx('orderdetails')
              .where('DetailID', detail.OrderDetailID)
              .update({ Status: 'Closed' });
          }
      
          // Validate general status in the base order
          console.log(order.OrderId);
          const allDetailsClosed = (await trx('orderdetails')
            .where('OrderID', order.OrderId)
            .andWhereNot('Status', 'Closed')
          ).length === 0;
      
          if (allDetailsClosed) {
            // If all details are closed, update the order status to 'Closed'
            await trx('order')
              .where('OrderID', order.OrderId)
              .update({ Status: 'Closed' });
          }
        }  
      }
      
      else {
        // for purchase begin

       
        for (const detail of detailsWithOrderId) {
          await trx('items') 
            .where('items.ItemID', detail.ItemID)
            .increment('items.TotalStock', detail.Quantity);
          
          await trx('item_locations') 
            .where({ 'ItemID': detail.ItemID, 'LocationID': detail.LocationID })
            .increment('item_locations.Stock', detail.Quantity);


            //update base document
            console.log("detail")
            console.log(detail)
            console.log('order')
            console.log(order)
            const baseOrderDetail = await trx('orderdetails')
            .where('DetailID', detail.OrderDetailID)
            .where('OrderID', order.OrderId)
            .first();

          console.log("after base order detail purchase")
            console.log(baseOrderDetail)

            console.log('validate detail status')
            console.log(baseOrderDetail)
            console.log(detail.Quantity)

          //reduce quantity delivered always
            await trx('orderdetails')
            .where('DetailID', detail.OrderDetailID)
            .update({ 
            openQty:baseOrderDetail.openQty-detail.Quantity
          });
          console.log('VALIDATE STATUS')
         console.log(baseOrderDetail.openQty)
         console.log(detail)


          if ((baseOrderDetail.openQty-detail.Quantity)===0) {
           //update the state
            await trx('orderdetails')
              .where('DetailID', detail.OrderDetailID)
              .update({ Status: 'Closed',
              // openQty:0
            });
          }


          //validate general status in base order
          console.log(order.OrderId)
          const allDetailsClosed = (await trx('orderdetails')
          .where('OrderID', order.OrderId)
          .andWhereNot('Status', 'Closed')
        ).length === 0;

        if (allDetailsClosed) {
          
          await trx('order')
            .where('OrderID', order.OrderId)
            .update({ Status: 'Closed' });
        }


        }
        ///end purchase



      }
      return Id;
    });

    console.log("Transaction ID:", transactionId);
    
    res.json({
      success: true,
      id:transactionId,
      message: 'Inventory transaction and details successfully created.',
  
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'Error creating inventory transaction and details',
      error: error.message
    });
  }
};



module.exports = {
  deliveryOrdersList,
  deliveryItemsList,
  purchaseOrdersList,
  findOneOrder,
  add,
  
}
