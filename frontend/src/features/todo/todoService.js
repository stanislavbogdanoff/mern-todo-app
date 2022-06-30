import axios from 'axios'

const API_URL = '/api/todos/'

//  Create new todo

const createTodo = async (todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, todoData, config)
  return response.data
}

//  Get user's todos

const getTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

//  Update todo status

const updateStatus = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  // IMPORTANT: don't forget an empty object {} as a second argument
  const response = await axios.patch(API_URL + todoId, {}, config)
  return response.data
}

//  Edit todo 

const editTodo = async (todoId, todoData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL + todoId + '/edit', todoData, config)
  return response.data
}

//  Delete todo

const deleteTodo = async (todoId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.delete(API_URL + todoId, config)
  return response.data
}

const todoService = {
  createTodo,
  getTodos,
  deleteTodo,
  updateStatus,
  editTodo
}

export default todoService