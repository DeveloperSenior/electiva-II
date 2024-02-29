const S = require("fluent-json-schema");
const Ajv = require("ajv")

const ajv = new Ajv({ allErrors: true});

const taskSchema =
    S.object()
        .prop("id", S.number().required().raw({ nullable: false }))
        .prop("name", S.string().required().raw({ nullable: false }))
        .prop("description", S.string().required().raw({ nullable: true }))
        .prop("createdDate", S.raw({ type: 'date' }).required())
        .prop("dueDate", S.raw({ type: 'date' }).required())
        .prop("status", S.string().required().raw({ nullable: true})).valueOf();

const validate = ajv.compile(taskSchema);
validateErrors = (errors) => {
    return errors.map(error =>  error.message );
}
const validateTask = (body) => {
    return { isValid: validate(body), errors: validateErrors(validate.errors || []) }
}

const validateNumeric= (value,message = 'valor no valido para un numerico') => {
    const isValid = Number.parseInt(value);
    return { isValid: isValid, errors: [isValid ||message] }
}




module.exports = { validateTask,validateNumeric }

