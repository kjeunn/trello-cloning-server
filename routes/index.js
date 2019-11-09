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
router.post("/card", function(req, res) {});

// update card
router.put("/card", function(req, res) {});

// delete card
router.delete("/card", function(req, res) {});

router.use("/user", user);

module.exports = router;
