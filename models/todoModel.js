const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoModel = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },

    createdUser: {
      type: mongoose.Types.ObjectId,
      ref: "CharitismUser",
    },

    createdUserName: {
      type: String,
    },

    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("CharitismTodo", todoModel);

module.exports = TodoModel;
