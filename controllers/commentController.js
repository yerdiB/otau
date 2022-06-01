const mongoose = require('mongoose');
const Comment = require('../models/Comment')

exports.createComment = async (req, res) => {
    const comment = new Comment({
        author: req.body.author,
        content: req.body.content,
        date: new Date(),
    });
    return comment
        .save()
        .then((newComment) => {
            return res.redirect("/products")
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}
exports.getAllComment = async (req, res) =>{
    try {
        const comment = await Comment.find();
        res.status(200).render('pages/products', {comment: comment})
    } catch(err) {
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: err.message,
        });
    }
}

exports.updateComment = async (req, res) => {
    const id = req.params.commentId;
    const updateObject = req.body;
    Comment.updateOne({ _id:id }, { $set:updateObject })
        .exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'Comment is updated',
                updateEvent: updateObject,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.'
            });
        });
}
exports.deleteComment = async (req, res) => {

    const id = req.params.commentId;
    Comment.findByIdAndRemove(id)
        .exec()
        .then(()=> res.status(204).json({
            success: true,
        }))
        .catch((err) => res.status(500).json({
            success: false,
        }));
}
