const todoModel = require("../models/todoModel");
const CharitismUser = require("../models/userModel");

const createTodo = async (req, res) => {
  const { userId, todo, status } = req.body;

  /*

  request body: 
  {
    'userId': "....",
    "todo" : "....",
    "status" : "....",
  }

  */

  if (!userId) {
    console.log("UserId param not sent with the request");
    return res.sendStatus(400);
  }

  try {
    const createdUser = await CharitismUser.findById({ _id: userId });

    let { password, username, ...createdUserdetails } = createdUser;
    console.log(createdUserdetails);

    const newTodo = await todoModel.create({
      todo,
      createdUser: createdUserdetails,
      createdUserName: username,
      status,
    });

    res.status(200).json({
      message: "ToDo created succesfully",
      todo: newTodo,
    });
  } catch (error) {
    res.status(400).json({
      message: `Something Went wrong. Error: ${error.message}`,
    });
  }
};

const getAllTodos = async (req, res) => {
  const { userId } = req.body;

  /*

  request body: 
  {
    'userId': "....",
   
  }

  */

  try {
    const allTodos = await todoModel
      .find({ createdUser: userId })
      .select("todo");
    res.status(200).json({
      message: "All your ToDo's",
      todos: allTodos,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const editTodo = async (req, res) => {
  const { todoId } = req.params;
  const { updatedToDo, status } = req.body;

  /*

  request body: 
  {
    'todoId': "....",
    "updatedToDo" : "....",
    "status" : "...."
  }

  */

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      { _id: todoId },
      { todo: updatedToDo, status },
      { new: true }
    );
    console.log(updatedTodo);

    if (updatedToDo) {
      res.status(201).json({
        message: "ToDo Updated!",
      });
    } else {
      res.status(404).json({
        message: "No ToDo Found",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteATodo = async (req, res) => {
  const { todoId } = req.params;

  /*

  request body: 
  {
    'todoId': "....",
  
  }

  */

  try {
    const result = await todoModel.findByIdAndDelete({ _id: todoId });

    if (result) {
      res.status(200).json({
        message: "ToDo Deleted Successfully!",
      });
    } else {
      res.status(204).json({
        message: "No Content",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteAllTodo = async (req, res) => {
  const { userId } = req.body;

  /*

  request body: 
  {
    'userId': "....",
  
  }

  */

  try {
    const result = await todoModel.deleteMany({ createdUser: userId });

    res.status(200).json({
      message: "All todo's have been deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  editTodo,
  deleteATodo,
  deleteAllTodo,
};
