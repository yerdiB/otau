const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let commentSchema = new mongoose.Schema({
    author: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
});
const commentModel = new mongoose.model("Comment", commentSchema);
module.exports = commentModel;