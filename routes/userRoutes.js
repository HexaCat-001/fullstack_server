const express = require('express')
const { registerController, loginController, updateUserController, requireSignIn } = require('../controllers/userController')

// * Router Object 
const router = express.Router()

// * Routes
// 1. Register || POST
router.post('/register', registerController)
// 2. Login || POST
router.post('/login', loginController)
// 3. UPDATE || PUT
router.put('/update-user', requireSignIn , updateUserController)

// * export
module.exports = router