const router = require("express").Router();
const db = require("../db");
const user = require("./user");

// add list
router.post("/list", async (req, res) => {
  const createdList = await db.list.post(req.body);
  if (createdList === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// update list
router.put("/list", async (req, res) => {
  const updatedList = await db.list.put(req.body);
  if (updatedList === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// delete list
router.delete("/list", async (req, res) => {
  const deletedList = await db.list.delete(req.body);
  if (deletedList === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// add card
router.post("/card", async (req, res) => {
  const createdCard = await db.card.post(req.body);
  if (createdCard === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// update card
router.put("/card", async (req, res) => {
  const updatedCard = await db.card.put(req.body);
  if (updatedCard === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

// delete card
router.delete("/card", async (req, res) => {
  const deletedCard = await db.card.delete(req.body);
  if (deletedCard === "failure") {
    res.json("failure");
  } else {
    res.json("success");
  }
});

router.use("/user", user);

module.exports = router;
