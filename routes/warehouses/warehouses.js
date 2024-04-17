const router = require('express').Router()
const warehousesController = require('../../controllers/warehouses/warehousesControllers')

router
  .route('/')
  .get(warehousesController.warehouseList)
  .post(warehousesController.add)

router.route('locations/:id').get(warehousesController.warehouseLocation)

router
  .route('/:id')
  .get(warehousesController.oneWarehouse)
  .put(warehousesController.update)
  .delete(warehousesController.remove)

module.exports = router
