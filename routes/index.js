const router = require("express").Router();
const db = require("../db");
const user = require("./user");

// add list
router.post("/list", function(req, res) {});

// update list
router.put("/list", function(req, res) {});

// delete list
router.delete("/list", function(req, res) {});

// add card
router.post("/card", function(req, res) {});

// update card
router.put("/card", function(req, res) {});

// delete card
router.delete("/card", function(req, res) {});

router.use("/user", user);

module.exports = router;
