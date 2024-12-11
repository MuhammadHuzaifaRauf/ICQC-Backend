const Joi = require('joi');

const recordingValidation = (data) => {
    const schema = Joi.object({
        audioParts: Joi.string().required(),
        initials: Joi.string().optional(),
        status: Joi.string().valid('saved', 'sent', 'hold').default('saved'),
        userId: Joi.string().required(),
    });

    return schema.validate(data);
};

const deleteValidation = (data) => {
    const schema = Joi.object({
        id: Joi.string().required(),
    });

    return schema.validate(data);
};

module.exports = { recordingValidation, deleteValidation };
