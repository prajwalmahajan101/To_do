const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    content: {
        type: String,
        required: true
    },
    isCompleted:{
        type: Boolean,
        required:true
    },
    day:{
        type:Date,
        required:true,
    },
    priority:{
        type:String,
        required:true,
    }
    

}, {
    timestamps: true
});
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;