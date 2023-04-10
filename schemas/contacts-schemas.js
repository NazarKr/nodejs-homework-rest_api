// const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// // const { handleMongooseError } = require("../utils");

// const addSchema = Joi.object({
//   name: Joi.string().required().messages({
//     "any.required": `"name" is required`,
//     "string.empty": `"name" cannot be empty`,
//     "string.base": `"name" must be string`,
//   }),
//   email: Joi.string().required().messages({
//     "any.required": `"email" is required`,
//     "string.empty": `"email" cannot be empty`,
//     "string.base": `"email" must be string`,
//   }),
//   phone: Joi.number().required().messages({
//     "any.required": `"phone" is required`,
//   }),
// });

// // ===================
// const contactSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Set name for contact"],
//     },
//     email: {
//       type: String,
//     },
//     phone: {
//       type: String,
//     },
//     favorite: {
//       type: Boolean,
//       default: false,
//     }
//   },
//   { versionKey: false, timestamps: true }
// );

// // ++++++++
// // contactSchema.post("save", handleMongooseError);
// // ++++++++

// const Contact = model("contacts", contactSchema);

// const updateFavoriteSchema = Joi.object({
//   favorite: Joi.boolean().required(),
// });

// const schemas = {
//   addSchema,
//   updateFavoriteSchema,
// };


// module.exports = {
//   Contact,
//   schemas,
// };
