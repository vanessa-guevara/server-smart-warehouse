const router = require('express').Router()
const inventoryTransactionController = require('../../controllers/inventoryTransactions/inventoryControllers')

router.route('/').post(inventoryTransactionController.add)

router.route('/delivery').get(inventoryTransactionController.deliveryItemsList)

router.route('/purchase').get(inventoryTransactionController.purchaseOrdersList)
router.route('/:id').get(inventoryTransactionController.findOneOrder)

module.exports = router
