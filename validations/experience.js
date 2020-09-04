const Validator = require('validator');
const isEmpty = require('./isEmpty');

// Data here is res.body
const validateExperienceInput = (data)=>{
    let errors = {};

    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';
    
    if(Validator.isEmpty(data.title)){
        errors.title = 'Job title is required';
    }
    if(Validator.isEmpty(data.company)){
        errors.company = 'Company field is required';
    }
    if(Validator.isEmpty(data.from)){
        errors.from = 'From Date field is required';
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateExperienceInput;