const { Router } = require("express");
const ForbiddenError = require("../errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const { User } = require("../models");

const router = new Router();


router.post("/users", (req, res, next) => {
  const user = new User(req.body);
  user
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});
//Création d'un USER


router.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "password" },
  });
  if (!user) {
    res.sendStatus(404);
  } else {
    res.json(user);
  }
});
//Récuperation d'un USER


router.put("/users/:id", checkAuth, (req, res, next) => {
  if (req.user.id !== parseInt(req.params.id)) throw new ForbiddenError();

  User.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
    .then(([nbUpdated]) => {
      if (!nbUpdated) return res.sendStatus(404);
      User.findByPk(parseInt(req.params.id), {
        attributes: { exclude: "password" },
      }).then((user) => res.json(user));
    })
    .catch(next);
});
//Update un USER

router.delete("/users/:id", checkAuth, (req, res) => {
  if (req.user.id !== parseInt(req.params.id)) throw new ForbiddenError();
  User.destroy({
    where: {
      id: parseInt(req.params.id),
    },
  }).then((nbDeleted) => {
    if (nbDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});
//Delete un USER

module.exports = router;