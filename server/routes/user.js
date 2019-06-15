const express = require("express");
const router = express.Router();
const user = require("../controllers/user");

router.post("/create", user.createUser);
router.get("/", user.getUsers);
router.get("/:id", user.getUser);
router.delete("/delete/:id", user.deleteUser);
router.put("/update/:id", user.updateUser);
module.exports = router;
