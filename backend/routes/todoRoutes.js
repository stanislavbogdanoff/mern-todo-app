const express = require('express')
const router = express.Router()
const { 
  getTodos, 
  setTodo,
  deleteTodo,
  updateStatus,
  editTodo 
} = require('../controllers/todoController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getTodos).post(protect, setTodo)
router.patch('/:id', protect, updateStatus)
router.put('/:id/edit', protect, editTodo)
router.delete('/:id', protect, deleteTodo)

module.exports = router