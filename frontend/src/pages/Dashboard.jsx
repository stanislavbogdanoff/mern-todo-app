import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getTodos, reset } from '../features/todo/todoSlice'

import { CheckOutlined, AimOutlined } from '@ant-design/icons'

import TodoForm from '../components/TodoForm'
import TodoRow from '../components/TodoRow'
import TodoCard from '../components/TodoCard'
import Spinner from '../components/Spinner'
import PieChart from '../components/PieChart'

import '../App.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { todos, isLoading, isError, message } = useSelector(
    (state) => state.todos
  )

  useEffect(() => {
    if (isError) console.log(message)
    if (!user) navigate('/login')
  }, [user, navigate, isError, message])

  useEffect(() => {
    dispatch(getTodos())
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  if (isLoading) return <Spinner />

  const doneNumber = todos.filter(todo => todo.status).length
  const notDoneNumber = todos.filter(todo => !todo.status).length
  const totalNumber = todos.length
  const share = (doneNumber / totalNumber) * 100

  return (

    <section className="dash-section">

      <h2 className='dash-heading'>
        Welcome, <font id='active-font'>{user && user.name}</font>! What's <font id='active-font'>up</font> today?
      </h2>

      <div className='stats-box'>

        <TodoForm />

        <div className="chart-box">
          <div className="chart-stats">
            <h3>Your stats</h3>
            <p>Total todos: {totalNumber}</p>
            <p><font id='active-font'>Active</font>: {notDoneNumber}</p>
            <p><font id='comp-font'>Completed</font>: {doneNumber}</p>
          </div>
          <PieChart share={share} />
        </div>

      </div>

      <div>
        <h2 className='todos-heading'><font id='active-font'><AimOutlined/> Active</font> Todos - {notDoneNumber}</h2>
        <table className="todos-box">
          <thead>
            <tr>
              <th className='table-no'>No.</th>
              <th className='table-date'>Date</th>
              <th className='table-text'>To Do</th>
              <th className='table-status heading'>Status</th>
              <th className='table-del'></th>
            </tr>
          </thead>
          <tbody>
            {
              todos && (
                todos.filter(todo => !todo.status).map((todo, index) => {
                  return (
                    <TodoRow num={index + 1} todo={todo} key={index}/>
                  )
                })
              )
            }
          </tbody>
          <div className="todos-mobile">
            {
              todos && (
                todos.filter(todo => !todo.status).map((todo, index) => {
                  return (
                    <TodoCard num={index + 1} todo={todo} key={index}/>
                  )
                })
              )
            }
          </div>
        </table>
      </div>

      <div>
        <h2 className='todos-heading'><font id='comp-font'><CheckOutlined/> Completed</font> Todos - {doneNumber}</h2>
        <table className="todos-box">
          <tbody>
            {
              todos && (
                todos.filter(todo => todo.status).map((todo, index) => {
                  return (
                    <TodoRow num={index + 1} todo={todo} key={index}/>
                  )
                })
              )
            }
          </tbody>
          <div className="todos-mobile">
            {
              todos && (
                todos.filter(todo => todo.status).map((todo, index) => {
                  return (
                    <TodoCard num={index + 1} todo={todo} key={index}/>
                  )
                })
              )
            }
          </div>
        </table>
      </div>

    </section>

  )
}

export default Dashboard