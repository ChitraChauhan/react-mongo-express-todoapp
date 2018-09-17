var express = require("express");
var router = express.Router();
var Todo = require("../models/Todo.js");

/* GET ALL Todo */
router.get("/", function(req, res, next) {
  Todo.find(function(err, tasks) {
    if (err) return next(err);
    res.json(tasks);
  });
});

/* GET SINGLE Todo BY ID */
router.get("/:id", function(req, res, next) {
  Todo.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE Todo */
router.post("/", function(req, res, next) {
  Todo.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE Todo */
router.put("/:id", function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE Todo */
router.delete("/:_id", function(req, res) {
  Todo.findByIdAndRemove({ _id: req.params._id }).exec((err, todo) => {
    if (err) {
      return res.json({ success: false, error: err });
    }
    return res.json({
      success: true,
      message: "Todo deleted successfully",
      todo
    });
  });
});

module.exports = router;
