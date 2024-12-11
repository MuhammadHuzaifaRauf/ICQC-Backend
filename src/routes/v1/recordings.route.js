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
    .post(validate(recordingValidation.recordingValidation), recordingController.holdRecording)
    .get(recordingController.getHeldRecordings)


router.route('/hold/:userId')
    .get(recordingController.getHeldRecordings)


router
    .route('/sent')
    .post(recordingController.sentRecordings)

router
    .route('/sent/:userId')
    .get(recordingController.getSentRecordings);

router
    .route('/recordings/:id')
    .delete(recordingController.deleteRecording);

router
    .route('/recordings/:id/send')
    .post(recordingController.sendRecording);
module.exports = router;
