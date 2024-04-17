const router = require('express').Router();
const ordersController = require('../../controllers/orders/ordersControllers')


router
    .route("/")
    .post(ordersController.add);
    
router
    .route("/sales")
    .get(ordersController.salesOrdersList);

router
    .route("/purchase")
    .get(ordersController.purchaseOrdersList);

router
  .route("/:id")
  .get(ordersController.findOneOrder)
  .put(ordersController.update)
  .delete(ordersController.remove);



module.exports = router;