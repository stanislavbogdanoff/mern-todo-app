import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createTodo } from '../features/todo/todoSlice'
import { EnterOutlined } from '@ant-design/icons'

import '../App.css'

const TodoForm = () => {
  const [text, setText] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTodo({ text }))
    console.log({text})
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>New Todo</h3>
      <input 
        type="text" 
        placeholder='Add new todo...'
        value={text} 
        onChange={handleChange}
      />
      <button type='submit'><EnterOutlined/> Submit</button>
    </form>
  )
}

export default TodoForm