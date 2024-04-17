const db = require("knex")(require("../../knexfile"));


// List
const warehouseList = async (_req, res) => {
  try {
    const data = await db
    .select('warehouses.*','users.Username')
    .from('warehouses')
    .leftJoin('users','users.UserID','warehouses.UserID')
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving warehouses: ${err}`)
  }
}


// get one
const oneWarehouse = async (_req, res) => {
  try {
    const data = await db
    .select('warehouses.*','users.Username')
    .from('warehouses')
    .leftJoin('users','users.UserID','warehouses.UserID')
    .where('warehouses.WarehouseID',_req.params.id)
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving warehouse: ${err}`)
  }
}


// locations per warehouse
const warehouseLocation = async (_req, res) => {
  try {
    const data = await db
      .select('warehouses.*','warehouselocations.*')
      .from('warehouses')
      .innerJoin('warehouselocations','warehouselocations.WarehouseID','warehouses.WarehouseID' ) 
      .where('warehouses.WarehouseID' ,_req.params.id)
    res.status(200).json(data)
  } catch (err) {
    res.status(400).send(`Error retrieving location per warehouse: ${err}`)
  }
}


const add = async (_req, res) => {
  try {
    const newWarehouseId = await db('warehouses').insert(_req.body)
    res.status(200).json({
      message: `Warehouse ${newWarehouseId[0]} created successfully`
    }
     
      )
  } catch (err) {
    res.status(500).json({
      message: `Unable to create warehouse: ${err}`
    })
  }
}


const update = async (_req, res) => {
  try {
    
    const rowsUpdated = await db('warehouses')
      .where({ WarehouseID: _req.params.id })
      .update(_req.body)

       
    if (rowsUpdated === 0) {
      return res.status(404).json({
        message: `Warehouse with ID ${_req.params.id} not found`
      })
    }
    
    const updatedWarehouse= await db('warehouses').where({
      WarehouseID: _req.params.id
    })
   
    res.json(updatedWarehouse[0])
  } catch (err) {
    res.status(500).json({
      message: `Unable to update warehouse with ID ${_req.params.id}: ${err}`
    })
  }
}

const remove = async (_req, res) => {
  try {
    const rowsDeleted = await db('warehouses')
      .where({ WarehouseID: _req.params.id })
      .del()
    if (rowsDeleted === 0) {
      return res.status(404).json({
        message: `Warehouses with ID ${_req.params.id} not found`
      })
    }

    res.sendStatus(204)
  } catch (err) {
    res.status(500).json({
      message: `Unable to delete warehouse: ${err}`
    })
  }
}

module.exports= {
  warehouseList,
  oneWarehouse,
  warehouseLocation,
  add,
  update,
  remove
 
}
