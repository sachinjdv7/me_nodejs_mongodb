const Todos = require("../models/todo.model");

const getTodoList = async (req, res) => {
  try {
  } catch (error) {
    res.status(404).json({ message: "Could not fetch Todos from DB" });
  }
};

const postTodoItem = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;

    const newTodo = {
      name,
      startDate,
      endDate,
    };
    Todos.create(newTodo, (err, newlyCreated) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        console.log(`[New todo item]::: ${newlyCreated}`);
        res.status(201).send(newlyCreated);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

const updateTodoItem = (req, res) => {
  try {
    const { _id, name, startDate, endDate } = req.body;

    const idToupdateTodo = _id;
    const updatedTo = {
      name,
      startDate,
      endDate,
    };

    Todos.findByIdAndUpdate(idToupdateTodo, updatedTo, (err, doc) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else if (doc === null) {
        res.status(400).send({ erro: " Resouce not found" });
      } else {
        res.status(204).send(doc);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTodoItem = (req, res) => {
  try {
    const IdToDelete = req.params.id;

    Todos.findByIdAndDelete(IdToDelete, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.status(204).send();
      }
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { getTodoList, postTodoItem, updateTodoItem, deleteTodoItem };
