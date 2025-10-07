const Item = require("../models/item");

const addItem = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;

    const item = await Item.create({ name, description, price, quantity });
    res.status(201).json({ message: "Item added successfully", item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const item = await Item.findByIdAndUpdate(id, updates, { new: true });
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item updated successfully", item });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addItem ,getItems ,updateItem , deleteItem };