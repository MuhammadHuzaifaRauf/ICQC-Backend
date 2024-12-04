const Joi = require('joi');

exports.signUpValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'user').optional(),
    });

    return schema.validate(data);
};

exports.loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    return schema.validate(data);
};

exports.resetPasswordValidation = (data) => {
    const schema = Joi.object({
        newPassword: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
    });

    return schema.validate(data);
};

exports.updateEmailValidation = (data) => {
    const schema = Joi.object({
        newEmail: Joi.string().email().required(),
    });

    return schema.validate(data);
};
