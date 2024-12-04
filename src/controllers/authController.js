const jwt = require('jsonwebtoken');
const {
    signUpService,
    loginService,
    resetPasswordService,
    updateEmailService,
    saveInitialsService,
    deleteAccountService,
} = require('../services/authService');
const {
    signUpValidation,
    resetPasswordValidation,
    updateEmailValidation,
} = require('../validations/authValidation');


const JWT_SECRET = process.env.JWT_SECRET;

exports.signUp = async (req, res) => {
    try {
        const { error } = signUpValidation(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const { firstName, lastName, email, password, role } = req.body;

        const user = await signUpService({
            firstName,
            lastName,
            email,
            password,
            role,
        });
        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({
            message: 'Sign up successful',
            token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sign up failed' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await loginService({ email, password });
        console.log('contoller function user => ', user);
        loginService({ email, password });

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({
            message: 'Login successful',
            token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { error } = resetPasswordValidation(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const { newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        if (!req.user || !req.user.id) {
            return res.status(400).json({ message: 'User not authenticated' });
        }

        const user = await resetPasswordService(req.user.id, newPassword);

        res.status(200).json({
            message: 'Password reset successful',
            user: { email: user.email },
        });
    } catch (err) {
        console.error('Error in resetPassword:', err);
        res.status(500).json({ message: err.message || 'Password reset failed' });
    }
};


exports.updateEmail = async (req, res) => {
    try {
        const { error } = updateEmailValidation(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });

        const { newEmail } = req.body;

        const user = await updateEmailService(req.user.id, newEmail);

        res.status(200).json({
            message: 'Email updated successfully',
            user: { email: user.email },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update email' });
    }
};

exports.saveInitials = async (req, res) => {
    try {
        const { initials } = req.body;
        await saveInitialsService(req.user.id, initials);
        res.status(200).json({ message: 'Initials saved successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save initials' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        await deleteAccountService(req.user.id);
        res.status(200).json({ message: 'Account deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete account' });
    }
};
