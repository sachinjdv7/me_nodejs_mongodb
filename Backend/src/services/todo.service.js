const Todos = require("../models/todo.model");

const findAndSearchAllTodo = async () => {
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

module.exports = { findAndSearchAllTodo };
