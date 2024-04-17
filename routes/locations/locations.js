const router = require('express').Router()
const locationsController = require('../../controllers/locations/locationsControllers')

router
  .route('/')
  .get(locationsController.locationsList)
  .post(locationsController.add)

router
.route('/item/:id')
.get(locationsController.locationsListItem)


router
.route('/default-item/:id')
.get(locationsController.locationsDefaultItem)



router
  .route('/:id')
  .put(locationsController.update)
  .delete(locationsController.remove)

module.exports = router
