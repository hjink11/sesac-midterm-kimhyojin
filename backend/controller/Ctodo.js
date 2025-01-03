const { Todo } = require("../models/index");

const { where } = require("sequelize");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const todoAll = await Todo.findAll();
    res.send(todoAll);
  } catch (err) {
    console.log(err);
    res.status(500).send("sever error");
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    console.log(req.params.id);
    const todoOne = await Todo.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (todoOne === null) {
      res.send({ message: "Todo not found" });
    }

    console.log(todoOne);
    res.send(todoOne);
  } catch (err) {
    console.log(err);
    res.status(500).send("sever error");
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.title) {
      res.send({ message: "Internal Server Error" });
    }
    const todoC = await Todo.create(req.body);
    res.send(todoC);
  } catch (err) {
    console.log(err);
    res.status(500).send("sever error");
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  console.log(req.params);
  try {
    const [result] = await Todo.update(
      {
        title: req.body.title,
        done: req.body.done,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send("sever error");
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  console.log(req.params.id);
  try {
    const result = await Todo.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      res.send({ message: "Todo not found" });
    }

    res.send({
      message: "Todo deleted successfully",
      deletedId: req.params.id,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("sever error");
  }
};
