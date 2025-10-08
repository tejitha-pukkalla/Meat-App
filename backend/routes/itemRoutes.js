const express = require("express");
const router = express.Router();

const {addItem,getItems,updateItem,deleteItem} = require("../controllers/itemController");

const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");


// router.post("/add-item", authMiddleware, adminOnly, addItem);
// router.put("/:id", authMiddleware, adminOnly, updateItem);
// router.delete("/:id", authMiddleware, adminOnly, deleteItem);

router.post("/add-item", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);
router.get("/get-items", getItems);

module.exports = router;


