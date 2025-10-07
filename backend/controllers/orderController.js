const Order = require("../models/Order");
const Item = require("../models/item");


const placeOrder = async (req, res) => {
  try {
    const customerId = req.user.id; 
    const { items } = req.body; 

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "No items in the order" });
    }

    
    let totalAmount = 0;
    for (const i of items) {
      const itemData = await Item.findById(i.item);
      if (!itemData) return res.status(404).json({ message: `Item not found: ${i.item}` });
      totalAmount += itemData.price * i.quantity;
    }

    const order = await Order.create({ customer: customerId, items, totalAmount });
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getOrders = async (req, res) => {
  try {
    const customerId = req.user.id;
    const orders = await Order.find({ customer: customerId })
      .populate("items.item", "name price"); 
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {placeOrder , getOrders};