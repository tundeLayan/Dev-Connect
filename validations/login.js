const Validator = require('validator');
const isEmpty = require('./isEmpty');

// Data here is res.body
const validateLoginInput = (data)=>{
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(Validator.isEmpty(data.email)){
        errors.email = 'Email field is required';
    }
    // returns true if its not an email
    else if(!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if(Validator.isEmpty(data.password)){
        errors.password = 'Password field is required';
    }
    return {
        errors,
        isValid:isEmpty(errors)
    }
}

module.exports = validateLoginInput;