const { Schema, model } = require("mongoose");
const Joi = require("joi");

const addSchemaTask = Joi.object({
  title: Joi.string().messages({
    "any.required": `"title" is required`,
    "string.empty": `"title" cannot be empty`,
    "string.base": `"title" must be string`,
  }),
  text: Joi.string().messages({
    "any.required": `"text" is required`,
    "string.empty": `"text" cannot be empty`,
    "string.base": `"text" must be string`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchemaTask = Joi.object({
  favorite: Joi.boolean().required(),
});


const taskSchema = new Schema(
  {
    title: {
      type: String,
    //   required: [true, "Set title for task"],
    },
    text: {
      type: String,
    },
    done: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);


taskSchema.post("save", (error, data, next) => {
  error.status = 400;
  next();
});

const Task = model("tasks", taskSchema);

const schemas = {
  addSchemaTask,
  updateFavoriteSchemaTask,
};

module.exports = {
  Task,
  schemas,
};