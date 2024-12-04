const express = require('express');
const validate = require('../../middlewares/validate');
const recordingValidation = require('../../validations/recordingsValidation');
const recordingController = require('../../controllers/recording.controller');

const router = express.Router();

router
    .route('/recordings')
    .get(recordingController.getRecordings)
    .post(validate(recordingValidation.recordingValidation), recordingController.createRecording);

router
    .route('/hold')
    .get(recordingController.getHeldRecordings)
    .post(validate(recordingValidation.recordingValidation), recordingController.holdRecording);


router
    .route('/sent')
    .get(recordingController.getSentRecordings);

router
    .route('/recordings/:id')
    .delete(recordingController.deleteRecording);

router
    .route('/recordings/:id/send')
    .post(recordingController.sendRecording);
module.exports = router;
