const express = require("express");
const router = express.Router();
const Todos = require("../../models/todo.model");

/**
 * Get all TODOS:
 * curl http://localhost:8082/v1/todos
 *
 * Get todos with their "startDate" b/w startDateMin and startDateMax
 * curl http://localhost:8082/v1/todos?startDateMin=2020-11-04&startDateMax=2020-12-30
 *
 */
router.get("/", async (req, res) => {
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
});

/**
 * Add a TODO to the list
 * curl -X POST http://localhost:8082/v1/todos \
    -d '{"name": "Learn Nodejs by doing","startDate": "2021-01-07","endDate": "2021-01-09"}' \
    -H 'Content-Type: application/json'
*/
router.post("/", async (req, res) => {
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
});

/**
 * Update an existing TODO
 * curl -v -X PUT http://localhost:8082/v1/todos \
    -d '{"_id": "<id-value>", "name": "Play tennis","startDate": "2021-01-07","endDate": "2021-01-09"}' \
    -H 'Content-Type: application/json'
 * 
 * Nb: You'll need to change the "id" value to that of one of your todo items
*/
router.put("/", (req, res) => {
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
});

/**
 * Delete a TODO from the list
 * curl -v -X "DELETE" http://localhost:8082/v1/todos/<id-value>
 *
 * Nb: You'll need to change "<id-value>" to the "id" value of one of your todo items
 */
router.delete("/:id", (req, res) => {
  const IdToDelete = req.params.id;

  Todos.findByIdAndDelete(IdToDelete, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      res.status(204).send();
    }
  });
});

module.exports = router;
