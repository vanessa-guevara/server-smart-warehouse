const db = require('knex')(require('../../knexfile'))

// List
const inventoryList = async (_req, res) => {
  try {
    const data = await db
      .select('items.*', 'itemsgroup.GroupName')
      .from('items')
      .join('itemsgroup', 'items.GroupCode', 'itemsgroup.GroupCode')
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving inventories: ${err}`)
  }
}

//category list
const groupList = async (_req, res) => {
  try {
    const data = await db.select('itemsgroup.*').from('itemsgroup')

    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving groups: ${err}`)
  }
}

//find item by id
const findOne = async (_req, res) => {
  try {
    const data = await db
      .select(
        'items.*',
        'warehouses.*',
        db.raw('SUM(item_locations.Stock) as TotalStock'),
        'items_has_warehouses.locationDefaultID'
      )
      .from('items')
      .leftJoin('itemsgroup', 'items.GroupCode', 'itemsgroup.GroupCode')
      .leftJoin('item_locations', 'items.ItemID', 'item_locations.ItemID')
      .leftJoin(
        'warehouselocations',
        'item_locations.LocationID',
        'warehouselocations.LocationID'
      )
      .leftJoin(
        'warehouses',
        'warehouselocations.WarehouseID',
        'warehouses.WarehouseID'
      )
      .leftJoin('items_has_warehouses', function () {
        this.on('items.ItemID', '=', 'items_has_warehouses.ItemID')
        // .orOn(
        //   'items_has_warehouses.locationDefaultID',
        //   '=',
        //   'warehouselocations.LocationID'
        // )
      })
      .where('items.ItemID', _req.params.id)
      .groupBy(
        'items.ItemID',
        'items.ItemCode',
        'items.ItemName',
        'items.Unit',
        'items.Weight',
        'items.GroupCode',
        'itemsgroup.GroupName',
        'warehouses.WarehouseID',
        'warehouses.WarehouseName',
        'items_has_warehouses.locationDefaultID',
      )

    if (data.length === 0) {
      return res.status(200).json({
        message: `Item with ID ${_req.params.id} not found`
      })
    }

    const item = {
      ItemID: data[0].ItemID,
      ItemCode: data[0].ItemCode,
      ItemName: data[0].ItemName,
      GroupCode: data[0].GroupCode,
      Unit: data[0].Unit,
      Weight: data[0].Weight,
      GroupName: data[0].GroupName
    }

    const warehouses = data.map(row => ({
      WarehouseID: row.WarehouseID,
      WarehouseName: row.WarehouseName,
      locationDefaultID: row.locationDefaultID,
      TotalStock: row.TotalStock
    }))

    const responseData = {
      item: item,
      warehouses: warehouses
    }

    res.json(responseData)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Unable to retrieve inventory data for item with ID ${_req.params.id}`
    })
  }
}

//find locations by id
const findLocationsbyId = async (_req, res) => {
  try {
    const data = await db
      .select(
        'items.*',
        'warehouselocations.*',
        'warehouses.*',
        'item_locations.*'
      )
      .from('items')
      .join('itemsgroup', 'items.GroupCode', 'itemsgroup.GroupCode')
      .leftJoin('item_locations', 'items.ItemID', 'item_locations.ItemID')
      .leftJoin(
        'warehouselocations',
        'item_locations.LocationID',
        'warehouselocations.LocationID'
      )
      .join(
        'warehouses',
        'warehouselocations.WarehouseID',
        'warehouses.WarehouseID'
      )
      .where('items.ItemID', _req.params.id)
      .where('warehouses.WarehouseID', _req.params.warehouseId)

    if (data.length === 0) {
      return res.status(200).json({
        message: `Item with ID ${_req.params.id} not found`
      })
    }

    const item = {
      ItemID: data[0].ItemID,
      ItemCode: data[0].ItemCode,
      ItemName: data[0].ItemName,
      GroupCode: data[0].GroupCode,
      Unit: data[0].Unit,
      Weight: data[0].Weight,
      GroupName: data[0].GroupName,
      WarehouseName: data[0].WarehouseName
    }

    const locations = data.map(row => ({
      LocationCode: row.LocationCode,
      Stock: row.Stock
    }))

    const responseData = {
      item: item,
      locations: locations
    }

    const itemData = responseData
    res.json(itemData)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: `Unable to retrieve inventory data for item with ID ${_req.params.id}`
    })
  }
}

const add = async (_req, res) => {
  try {

    const [newItemId] = await db('items').insert(_req.body)

    res.status(200).json({ message: `Item succesful created ${newItemId}` })
  } catch (err) {
    res.status(500).json({
      message: `Unable to retrieve posts for inventory: ${err}`
    })
  }
}

const update = async (_req, res) => {
  try {

    const rowsUpdated = await db('items')
      .where({ ItemID: _req.params.id })
      .update(_req.body)

    console.log(rowsUpdated)
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Item with ID ${_req.params.id} not found`
      })
    }

    const updatedItem = await db('items').where({
      ItemID: _req.params.id
    })

    res.json(updatedItem[0])
  } catch (err) {
    res.status(500).json({
      message: `Unable to update item with ID ${_req.params.id}: ${err}`
    })
  }
}

const remove = async (_req, res) => {
  try {
    const rowsDeleted = await db('items')
      .where({ ItemID: _req.params.id })
      .del()
    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Item with ID ${_req.params.id} not found`
      })
    }

    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({
      message: `Unable to delete item: ${err}`
    })
  }
}

module.exports = {
  inventoryList,
  groupList,
  findOne,
  findLocationsbyId,
  add,
  update,
  remove
}
