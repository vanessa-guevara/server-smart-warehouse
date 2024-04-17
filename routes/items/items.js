const router = require('express').Router();
const itemsController = require('../../controllers/items/itemsControllers');

router
    .route("/")
    .get(itemsController.inventoryList)
    .post(itemsController.add);
    
router
    .route("/groups")
    .get(itemsController.groupList)
    
router
  .route("/:id")
  .get(itemsController.findOne)
  .put(itemsController.update)
  .delete(itemsController.remove);

router
  .route("/:id/warehouse/:warehouseId")
  .get(itemsController.findLocationsbyId)





module.exports = router;