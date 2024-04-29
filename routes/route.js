const express = require('express');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');

const router = express.Router();

// Get all items
router.get('/', getAllItems);

// Get item by ID
router.get('/:id', getItemById);

// Create a new item
router.post('/', createItem);

// Update an item
router.put('/:nim', updateItem);

// Delete an item
router.delete('/:id', deleteItem);

module.exports = router;