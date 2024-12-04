const bcrypt = require('bcryptjs');
const UserData = require('../models/user.model');

exports.signUpService = async ({
    firstName,
    lastName,
    email,
    password,
    role,
}) => {
    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const newUser = new UserData({ firstName, lastName, email, password, role });
    await newUser.save();
    return newUser;
};

exports.loginService = async ({ email, password }) => {
    const user = await UserData.findOne({ email });
    console.log('login user => ', user);
    console.log('Password received for comparison:', password);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);

    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    return user;
};

exports.resetPasswordService = async (userId, newPassword) => {
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await UserData.findByIdAndUpdate(userId, {
        password: newPassword,
    });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};


exports.updateEmailService = async (userId, newEmail) => {
    const user = await UserData.findByIdAndUpdate(userId, { email: newEmail });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

exports.saveInitialsService = async (userId, initials) => {
    const user = await UserData.findByIdAndUpdate(userId, { initials });
    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

exports.deleteAccountService = async (userId) => {
    const user = await UserData.findByIdAndDelete(userId);
    if (!user) {
        throw new Error('User not found');
    }

    return true;
};
