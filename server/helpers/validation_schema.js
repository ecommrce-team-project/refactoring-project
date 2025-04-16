const joi = require('@hapi/joi')

module.exports = {
  authSchema: joi.object({
    email: joi.string().email().lowercase().required().trim().messages({
      "string.email": "Email must be a valid email address",
      "string.empty": "Email is required",
      "any.required": "Email is required"
    }),
    username: joi.string().alphanum().min(3).max(30).required().trim().messages({
      "string.alphanum": "Username must contain only alphanumeric characters",
      "string.min": "Username must be at least 3 characters long",
      "string.max": "Username must be at most 30 characters long",
      "string.empty": "Username is required",
      "any.required": "Username is required"
    }),
    password: joi.string().min(6).required().trim().messages({
      "string.min": "Password must be at least 6 characters long",
      "string.empty": "Password is required"
    })
  }),

  loginSchema: joi.object({
    identifier: joi.string().required().trim().messages({
      "string.empty": "Email or username is required",
      "any.required": "Email or username is required"
    }),
    password: joi.string().min(6).required().trim().messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "any.required": "Password is required"
    })
  })
};
