const Joi = require('joi');

const recordingValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        filePath: Joi.string().required(),
        duration: Joi.number().required(),
        initials: Joi.string().required(),
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
