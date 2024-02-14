const Todos = require("../models/todo.model");
const getTodoList = async (req, res) => {
  if (req.query.startDateMax && req.query.startDateMin) {
    let startDateMax = new Date(req.query.startDateMax);
    startDateMax.setTime(startDateMax.getTime());

    let startDateMin = new Date(req.query.startDateMin);
    startDateMin.setTime(startDateMin.getTime());

    Todos.find(
      {
        startDate: {
          $lte: startDateMax,
          $gte: startDateMin,
        },
      },
      (err, allTodos) => {
        if (err) {
          console.log(err);
        } else {
          res.send(allTodos);
        }
      }
    );
  } else {
    await Todos.find({}, (err, allTodos) => {
      if (err) {
        res.status(500).send();
      } else {
        res.status(200).send(allTodos);
      }
    });
  }
};

const postTodoItem = async (req, res) => {
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
};

const updateTodoItem = (req, res) => {
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
};

const deleteTodoItem = (req, res) => {
  const IdToDelete = req.params.id;

  Todos.findByIdAndDelete(IdToDelete, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
};

module.exports = { getTodoList, postTodoItem, updateTodoItem, deleteTodoItem };
