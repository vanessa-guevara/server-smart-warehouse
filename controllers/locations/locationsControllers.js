const db = require('knex')(require('../../knexfile'))

// List
const locationsList = async (_req, res) => {
  try {
    const data = await db
      .select('warehouselocations.*')
      .from('warehouselocations')
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving locations: ${err}`)
  }
}



// location per item
const locationsListItem = async (_req, res) => {
   
    try {
      const data = await db
        .select('warehouselocations.LocationCode',
        'item_locations.ItemID',
        'item_locations.Stock',
        'item_locations.LocationID',
        'warehouses.WarehouseName',
        'items.ItemName')
        .from('warehouselocations')
        .innerJoin('item_locations','item_locations.LocationID', 'warehouselocations.LocationID')
        .innerJoin('warehouses','warehouses.WarehouseID','warehouselocations.WarehouseID')
        .innerJoin('items','items.ItemID','item_locations.ItemID')
        .where('item_locations.ItemID',_req.params.id)
      res.status(200).json(data)
    } catch (err) {
      res.status(400).send(`Error retrieving locations: ${err}`)
    }
  }


  // location default item by warehouse
const locationsDefaultItem = async (_req, res) => {
   
  try {
    const data = await db
      .select('items_has_warehouses.ItemID',
      'items_has_warehouses.WarehouseID',
      'warehouselocations.LocationID',
      'warehouselocations.LocationCode',
      'warehouses.WarehouseName')
      .from('items_has_warehouses')
      .innerJoin('warehouselocations','items_has_warehouses.locationDefaultID', 'warehouselocations.LocationID')
      .innerJoin('warehouses','warehouses.WarehouseID','items_has_warehouses.WarehouseID')
      .where('items_has_warehouses.ItemID',_req.params.id)
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving locations: ${err}`)
  }
}




const add = async (_req, res) => {
  try {
    const newLocationId = await db('warehouselocations').insert(_req.body)
    res.status(200).json(newLocationId[0])
  } catch (err) {
    res.status(500).json({
      message: `Unable to create locations: ${err}`
    })
  }
}

const update = async (_req, res) => {
  try {
    const rowsUpdated = await db('warehouselocations')
      .where({ LocationID: _req.params.id })
      .update(_req.body)

    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Location with ID ${_req.params.id} not found`
      })
    }

    const updatedLocation = await db('warehouselocations').where({
      LocationID: _req.params.id
    })

    res.json(updatedLocation[0])
  } catch (err) {
    res.status(500).json({
      message: `Unable to update Location with ID ${_req.params.id}: ${err}`
    })
  }
}

const remove = async (_req, res) => {
  try {
    const rowsDeleted = await db('warehouselocations')
      .where({ LocationID: _req.params.id })
      .del()
    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Location with ID ${_req.params.id} not found`
      })
    }

    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({
      message: `Unable to delete location: ${err}`
    })
  }
}

module.exports = {
  locationsList,
  locationsListItem,
  locationsDefaultItem,
  add,
  update,
  remove
}
