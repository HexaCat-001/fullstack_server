const express = require('express');
const { createPostController, getAllpostController, getUserPostController, deleteUserPostController, updateUserPostController } = require('../controllers/postController');
const { requireSignIn } = require('../controllers/userController');

// router object
const router = express.Router();

// create post || POST
router.post('/create-post', requireSignIn, createPostController)
// get all post || GET
router.get('/get-all-post', getAllpostController)
// get user post || GET
router.get('/get-user-post', requireSignIn, getUserPostController)
// delete user post || GET
router.delete('/delete-user-post/:id', requireSignIn, deleteUserPostController)
// update user post || GET
router.put('/update-user-post/:id', requireSignIn, updateUserPostController)
// export
module.exports = router;
