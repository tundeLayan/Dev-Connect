const Validator = require('validator');
const isEmpty = require('./isEmpty');

// Data here is res.body
const validateEducationInput = (data)=>{
    let errors = {};

    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if(Validator.isEmpty(data.school)){
        errors.school = 'School field is required';
    }
    if(Validator.isEmpty(data.degree)){
        errors.degree = 'Degree is required';
    }
    if(Validator.isEmpty(data.from)){
        errors.from = 'From date is required';
    }


    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateEducationInput;