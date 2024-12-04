// const express = require('express');
// const validate = require('../../middlewares/validate');
// const authValidation = require('../../validations/authValidation');
// const authController = require('../../controllers/authController');

// const router = express.Router();

// router
//     .route('/signup')
//     .post(validate(authValidation.signUpValidation), authController.signUp);

// router
//     .route('/login')
//     .post(validate(authValidation.loginValidation), authController.login);

// router
//     .route('/reset-password')
//     .put(validate(authValidation.resetPasswordValidation), authController.resetPassword);

// router
//     .route('/update-email')
//     .put(validate(authValidation.updateEmailValidation), authController.updateEmail);

// router
//     .route('/save-initials')
//     .put(authController.saveInitials);

// router
//     .route('/delete-account')
//     .delete(authController.deleteAccount);

// module.exports = router;



const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/authValidation');
const authController = require('../../controllers/authController');
const authenticateToken = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/signup', validate(authValidation.signUpValidation), authController.signUp);
router.post('/login', validate(authValidation.loginValidation), authController.login);

router.put('/reset-password', authenticateToken, validate(authValidation.resetPasswordValidation), authController.resetPassword);
router.put('/update-email', authenticateToken, validate(authValidation.updateEmailValidation), authController.updateEmail);
router.put('/save-initials', authenticateToken, authController.saveInitials);
router.delete('/delete-account', authenticateToken, authController.deleteAccount);

module.exports = router;
