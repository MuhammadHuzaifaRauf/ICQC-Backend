
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const moment = require('moment');

const getCurrentTime = () => {
    return moment().format('hh:mm A');
};




const recordingSchema = new mongoose.Schema({
    audioParts: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['saved', 'sent', 'hold'], default: 'saved'
    },
    time: {
        type: String,
        default: getCurrentTime
    },
    initials: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

recordingSchema.plugin(toJSON);
recordingSchema.plugin(paginate);

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
