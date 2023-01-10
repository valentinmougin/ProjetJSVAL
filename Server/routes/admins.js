const { Router } = require("express");
const ForbiddenError = require("../errors/ForbiddenError");
const checkAuth = require("../middlewares/checkAuth");
const checkRole = require("../middlewares/checkRole");
const { admin } = require("../models");

const router = new Router();


router.post("/admin", (req, res, next) => {
  const admin = new admin(req.body);
  admin
    .save()
    .then((data) => res.status(201).json(data))
    .catch(next);
});
//Création d'un admin


router.get("/admin/:id", async (req, res) => {
  const admin = await admin.findByPk(parseInt(req.params.id), {
    attributes: { exclude: "password" },
  });
  if (!admin) {
    res.sendStatus(404);
  } else {
    res.json(admin);
  }
});
//Récuperation d'un admin


router.put("/admin/:id", checkAuth, (req, res, next) => {
  if (req.admin.id !== parseInt(req.params.id)) throw new ForbiddenError();

  admin.update(req.body, {
    where: { id: parseInt(req.params.id) },
    individualHooks: true,
  })
  .catch(next);
});
//Update un admin

router.delete("/admin/:id", checkAuth, (req, res) => {
  if (req.admin.id !== parseInt(req.params.id)) throw new ForbiddenError();
  admin.destroy({where: {id: parseInt(req.params.id),},
  }).then((nbDeleted) => {
    if (nbDeleted) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  });
});
//Delete un admin

module.exports = router;