const {
    recordingValidation,
    deleteValidation,
} = require('../validations/recordingsValidation');
const {
    getAllRecordings,
    saveRecording,
    holdRecording,
    deleteRecording,
    updateRecordingStatus,
    getHeldRecordings,
    getSentRecordings,
    sendRecording,
} = require('../services/recording.service');

const mongoose = require('mongoose');

exports.getRecordings = async (req, res) => {
    try {
        const recordings = await getAllRecordings();
        res.status(200).json(recordings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching recordings' });
    }
};

exports.getHeldRecordings = async (req, res) => {
    try {
        const userId = req.params.userId;
        const heldRecordings = await getHeldRecordings(userId);
        res.status(200).json(heldRecordings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching held recordings' });
    }
};

exports.getSentRecordings = async (req, res) => {
    const userId = req.params.userId;
    try {
        const sentRecordings = await getSentRecordings(userId);
        res.status(200).json(sentRecordings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching sent recordings' });
    }
};

exports.createRecording = async (req, res) => {
    try {
        const { error } = recordingValidation(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const { name, filePath, duration, initials } = req.body;

        const newRecording = await saveRecording({
            name,
            filePath,
            duration,
            initials,
            status: 'saved',
        });

        res.status(201).json({
            message: 'Recording saved successfully',
            recording: newRecording,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save recording' });
    }
};

exports.holdRecording = async (req, res) => {
    try {
        const { error } = recordingValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { date, time, audioParts, status, userId } = req.body;

        if (!audioParts) {
            return res.status(400).json({ message: 'audioParts is required' });
        }

        const userObjectId = mongoose.Types.ObjectId(userId);

        const newRecording = await holdRecording({
            date,
            time,
            status,
            audioParts,
            userId: userObjectId
        });

        res.status(201).json({
            message: 'Recording held successfully',
            recording: newRecording,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to hold recording' });
    }
};



exports.sentRecordings = async (req, res) => {
    try {
        const { error } = recordingValidation(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { date, time, audioParts, status, userId } = req.body;

        if (!audioParts) {
            return res.status(400).json({ message: 'audioParts is required' });
        }

        const userObjectId = mongoose.Types.ObjectId(userId);

        const newRecording = await sendRecording({
            date,
            time,
            status,
            audioParts,
            userId: userObjectId
        });

        res.status(201).json({
            message: 'Recording send successfully',
            recording: newRecording,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to send recording' });
    }
};
exports.deleteRecording = async (req, res) => {
    try {
        const { error } = deleteValidation(req.params);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const deletedRecording = await deleteRecording(req.params.id);
        if (!deletedRecording) {
            return res.status(404).json({ message: 'Recording not found' });
        }

        res.status(200).json({ message: 'Recording deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting recording' });
    }
};

exports.sendRecording = async (req, res) => {
    try {
        const { error } = deleteValidation(req.params);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const updatedRecording = await updateRecordingStatus(req.params.id, 'sent');
        if (!updatedRecording) {
            return res.status(404).json({ message: 'Recording not found' });
        }

        res.status(200).json({
            message: 'Recording sent successfully',
            recording: updatedRecording,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error sending recording' });
    }
};
