const postModel = require("../models/postModel");

// Create a new post
const createPostController = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).send({
                success: false,
                message: 'Please provide title'
            })
        }
        if (!description) {
            return res.status(400).send({
                success: false,
                message: 'Please provide description'
            })
        }
        const post = await postModel({ title, description, postedBy: req.auth._id }).save();
        console.log(req)
        res.status(200).send({
            success: true,
            message: 'Post created successfully',
            post
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in create post api',
            error: error
        });
    }
}

// Get all post
const getAllpostController = async (req, res) => {
    try {
        const posts = await postModel.find().populate('postedBy', '_id name').sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            message: 'All Post Data',
            posts
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in  get-all-post api',
            error: error
        });
    }
};

// Get user specific post
const getUserPostController = async (req, res) => {
    try {
        let id = req.auth._id
        const userPosts = await postModel.find({ postedBy: id });
        res.status(200).send({
            success: true,
            message: 'User Posts',
            userPosts,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error in  get-user-post api',
            error: error
        });
    }
}

// Delete user specific post
const deleteUserPostController = async (req, res) => {
    try {
        await postModel.findByIdAndDelete({ _id: req.params.id });
        return res.status(200).send({
            success: true,
            message: 'You post has been deleted!',
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in delete-user-post api',
            error: error
        });
    }
}

// update user specific post
const updateUserPostController = async (req, res) => {
    try {
        // post find
        const { title, description } = req.body;
        const post = await postModel.findById({ _id: req.params.id })
        // valid
        if (!title || !description) {
            return res.status(500).send({
                success: false,
                message: 'Please provide a title or description',
            })
        }
        const updatedpost = await postModel.findByIdAndUpdate({ _id: req.params.id },
            {
                title: title || post.title,
                description: description || post.description
            }, {new: true})
            res.status(200).send({
                success: true,
                message: 'Post updated successfully',
                updatedpost,
            })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: 'Error in update-user-post api',
            error: error
        });
    }
}

module.exports = { createPostController, getAllpostController, getUserPostController, deleteUserPostController, updateUserPostController }