const mongoose = require('mongoose');

const hasAllRequiredFields = (fields, json_data) => {
    let is_valid = true;
    let invalid_fields = []
    fields.forEach(field => {
        if (!json_data[field]) {
            is_valid = false;
            invalid_fields.push(field);
        }
    });
    return {is_valid, invalid_fields};
};

const isIDValid = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
    hasAllRequiredFields,
    isIDValid
};