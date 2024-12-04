const mongoose = require('mongoose');
const moment = require('moment');


const getCurrentTime = () => {
    return moment().format('hh:mm A');
};


const recordingSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    filePath:
    {
        type: String,
        required: true
    },
    duration:
    {
        type: Number,
        required: true
    },
    status:
    {
        type: String,
        enum: ['saved', 'sent', 'hold'], default: 'saved'
    },
    time:
    {
        type: String,
        default: getCurrentTime
    },
    initials:
    {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now
    },
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
