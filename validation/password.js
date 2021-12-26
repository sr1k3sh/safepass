const Validator = require("validator");
const isEmpty = require("is-empty");
const validUrl = require('valid-url');
module.exports = function validatePasswordInput(data) {
  let errors = {};
// Convert empty fields to an empty string so we can use validator function
  data.url = !isEmpty(data.url) ? data.url : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.userId = !isEmpty(data.userId) ? data.userId : "";
  data.userName = !isEmpty(data.userName) ? data.userName : "";

  if(!validUrl.isUri(data.url)){
    errors.url = "invalid url";
  }

  if(Validator.isEmpty(data.userId)){
    errors.userId = "Empty UserData"
  }

  if(Validator.isEmpty(data.userName)){
    errors.userName = "Empty UserData"
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
return {
    errors,
    isValid: isEmpty(errors)
  };
};