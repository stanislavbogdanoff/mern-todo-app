const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Todo = require('../models/todoModel')

//@desc   Get user todos
//@route  GET /api/todos
//@access Private

const getTodos = asyncHandler(async (req, res) => {
  // Find todos by user id
  const todos = await Todo.find({ user: req.user.id })
  res.status(200).json(todos)
})

//@desc   Add todo
//@route  POST /api/todos
//@access Private

const setTodo = asyncHandler(async (req, res) => {
  // Ensure todo has text
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }
  // Create todo
  const todo = await Todo.create({
    text: req.body.text,
    user: req.user.id
  })
  res.status(200).json(todo)
})

//@desc   Update todo status
//@route  PATCH /api/todos/:id
//@access Private

const updateStatus = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(400)
    throw new Error('Todo not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if user is logged in
  if (todo.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, { status: !todo.status }, { new: true })

  res.status(200).json(updatedTodo)
})

//@desc   Edit todo text
//@route  PUT /api/todos/:id
//@access Private

const editTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(400)
    throw new Error('Todo not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if user is logged in
  if (todo.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const editedTodo = await Todo.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true }
  )

  res.status(200).json(editedTodo)
})

//@desc   Delete todo
//@route  DELETE /api/todos/:id
//@access Private

const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id)

  if (!todo) {
    res.status(400)
    throw new Error('Todo not found')
  }

  // Check if user exists
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Check if user is logged in
  if (todo.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await todo.delete()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getTodos,
  setTodo,
  deleteTodo,
  updateStatus,
  editTodo
}