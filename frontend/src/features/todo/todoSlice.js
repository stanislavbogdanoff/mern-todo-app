import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import todoService from './todoService'

const initialState = {
  todos: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

//  Create new todo 
export const createTodo = createAsyncThunk(
  'todos/create',
  async (todoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.createTodo(todoData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//  Get user todos
export const getTodos = createAsyncThunk(
  'todos/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.getTodos(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//  Update todo status
export const updateStatus = createAsyncThunk(
  'todos/updateStatus',
  async (id, thunkAPI) => {
    console.log(thunkAPI.getState().auth.user.token)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.updateStatus(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//  Edit todo 

export const editTodo = createAsyncThunk(
  'todos/edit',
  async (todoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      //  It takes the object from args 
      //  Passes its id as first arg
      //  And the text in MDB doc as a second arg as *IMPORTANT* an object
      return await todoService.editTodo(todoData.id, { text: todoData.text}, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//  Delete todo
export const deleteTodo = createAsyncThunk(
  'todos/delete',
  async (id, thunkAPI) => {
    console.log(thunkAPI.getState().auth.user.token)
    try {
      const token = thunkAPI.getState().auth.user.token
      return await todoService.deleteTodo(id, token) 
    }
    catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //  Create new todo
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos.push(action.payload)
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //  Get all todos
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = action.payload
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //  Update todo status
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = state.todos.map(todo => {
          return todo._id === action.payload._id ? 
          action.payload : todo
        })
        state.todos = state.todos.sort((prev, next) => 
          new Date(prev.createdAt) - new Date(next.createdAt)
        )
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Edit todo
      .addCase(editTodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = state.todos.map(todo => {
          return todo._id === action.payload._id ? 
          action.payload : todo
        })
        state.todos = state.todos.sort((prev, next) => 
          new Date(prev.createdAt) - new Date(next.createdAt)
        )
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      //  Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.todos = state.todos.filter(
          (todo) => todo._id !== action.payload.id
        )
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = todoSlice.actions
export default todoSlice.reducer