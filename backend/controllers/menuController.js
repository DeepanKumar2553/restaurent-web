const MenuItem = require('../models/menuItem');
const catchAsync = require('../utils/catchAsync');

const getAllItems = catchAsync(async (req, res) => {
    const items = await MenuItem.find();
    res.status(200).json(items);
});

const getItemsByCategory = catchAsync(async (req, res) => {
    const categoryRegex = new RegExp(`^${req.params.category}$`, 'i');
    const items = await MenuItem.find({ category: categoryRegex });
    res.status(200).json(items);
});

const createItem = catchAsync(async (req, res) => {
    const { name, description, price, category, image, tags, isAvailable } = req.body;

    const newItem = new MenuItem({
        name,
        description,
        price,
        category,
        image,
        tags,
        isAvailable
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
});

const updateItem = catchAsync(async (req, res) => {
    const updatedItem = await MenuItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.status(200).json(updatedItem);
});

const deleteItem = catchAsync(async (req, res) => {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) return res.status(404).json({ message: "Item not found" });
});

module.exports = {
    getAllItems,
    getItemsByCategory,
    createItem,
    updateItem,
    deleteItem
}