const router = require('express').Router();
const userControllers = require('../../controllers/users/userControllers');

router
     .route("/")
     .get(userControllers.userList)

router
    .route("/login")
    .post(userControllers.login)
router
    .route("/signup")
    .post(userControllers.signup);

router
    .route("/profile")
    .get(userControllers.profile)

    
module.exports = router;