const Recording = require('../models/recordings.model');

const getAllRecordings = async () => {
    return await Recording.find();
};

const getRecordingById = async (id) => {
    return await Recording.findById(id);
};

const saveRecording = async (data) => {
    const recording = new Recording(data);
    return await recording.save();
};

const holdRecording = async (data) => {
    const newRecording = new Recording({
        ...data,
        status: 'hold',
    });
    return await newRecording.save();
};
const sendRecording = async (data) => {
    const newRecording = new Recording({
        ...data,
        status: 'sent',
    });
    return await newRecording.save();
};

const deleteRecording = async (id) => {
    return await Recording.findByIdAndDelete(id);
};

const updateRecordingStatus = async (id, status) => {
    return await Recording.findByIdAndUpdate(id, { status }, { new: true });
};

const getHeldRecordings = async (userId) => {
    return await Recording.find({ userId, status: 'hold' });
};

const getSentRecordings = async (userId) => {
    return await Recording.find({ userId, status: 'sent' });
};

module.exports = {
    getAllRecordings,
    getRecordingById,
    saveRecording,
    holdRecording,
    sendRecording,
    deleteRecording,
    updateRecordingStatus,
    getHeldRecordings,
    getSentRecordings
};