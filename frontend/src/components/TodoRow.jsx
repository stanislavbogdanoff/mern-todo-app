import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTodo, updateStatus, editTodo } from '../features/todo/todoSlice'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const TodoRow = ({ num, todo }) => {
  const dispatch = useDispatch()

  const [text, setText] = useState(todo.text)
  const [editMode, setEditMode] = useState(false)

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id))
  }

  const handleStatusUpdate = () => {
    dispatch(updateStatus(todo._id))
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleEdit = () => {
    // editTodo takes a single arg as an object with id and text
    dispatch(editTodo({ id: todo._id, text}))
  }

  return (

    <tr className='todo-row'>

      <td className='table-no'>{num}.</td>

      <td className='table-date'>
        {new Date(todo.createdAt).toLocaleDateString('en-US')} <br />
        {new Date(todo.createdAt).toLocaleTimeString('en-US')}
      </td>

      <td className='table-text'>
        { editMode ? (
          <form className='edit-form' onSubmit={e => {e.preventDefault(); handleEdit()}}>

            <input 
              type="text"
              value={text} 
              onChange={handleChange}
            />

            <button 
              type='submit' 
              onClick={() => {setEditMode(!editMode); handleEdit()}}
            >
              Update
            </button>

          </form>
        ) : (
        <div className='edit-form'>

          <p>{todo.text}</p>

          <button 
            onClick={() => setEditMode(!editMode)}
            type='button'
          >
            <EditOutlined />Edit
          </button>

        </div>)}
      </td>

      <td className='table-status' onClick={handleStatusUpdate}>
        <label style={ todo.status ? {color: 'rgb(111, 255, 166)'} : {color: 'rgb(111, 226, 255)'}} >
          { todo.status ? 'Done' : 'Not Done'}
        </label>
        <form>
          <input 
            type="checkbox" 
            onChange={handleStatusUpdate} 
            checked={todo.status ? true : false}
          />
        </form>
      </td>

      <td className='table-del'>
        <button onClick={handleDelete} type='button'><DeleteOutlined style={{fontSize: '150%'}} /></button>
      </td>

    </tr>

  )
}

export default TodoRow