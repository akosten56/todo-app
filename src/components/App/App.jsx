import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

const App = () => {
  const [id, setId] = useState(10)
  const [tasksData, setTasksData] = useState([])
  const [timers, setTimers] = useState({})
  const [filter, setFilter] = useState('all')

  const addTask = (value, time, showTimer = true) => {
    setId((id) => id + 1)

    setTasksData((tasksData) => {
      const newTask = {
        id: id,
        label: value,
        completed: false,
        date: new Date(),
        time: time,
        isTimerOn: false,
        showTimer: showTimer,
      }
      const newTaskData = [...tasksData, newTask]
      return newTaskData
    })

    //if (showTimer) timerOn(id)
  }

  const deleteTask = (id, e) => {
    if (e) e.stopPropagation()

    //timerOff(id)

    setTasksData((tasksData) => {
      const i = tasksData.findIndex((el) => el.id === id)
      const newTaskData = [...tasksData]
      newTaskData.splice(i, 1)
      return newTaskData
    })
  }

  const saveTime = (id, time) => {
    setTasksData((tasksData) => {
      const newTaskData = [...tasksData]
      const task = newTaskData.find((el) => el.id === id)
      task.time = time
      return newTaskData
    })
  }

  const timerOn = (id, e) => {
    if (e) e.stopPropagation()

    const task = tasksData.find((el) => el.id === id)
    const isTimerOn = task ? task.isTimerOn : false
    if (isTimerOn) return

    setTimers((timers) => {
      const newTimers = { ...timers }

      newTimers[id] = setInterval(() => {
        setTasksData((tasksData) => {
          const newTaskData = [...tasksData]
          const task = newTaskData.find((el) => el.id === id)
          task.time = task.time - 1
          if (task.time === 0) {
            clearInterval(newTimers[id])
            task.showTimer = false
          }
          task.isTimerOn = true
          return newTaskData
        })
      }, 1000)

      return newTimers
    })
  }

  const timerOff = (id, e) => {
    if (e) e.stopPropagation()

    clearInterval(timers[id])

    setTimers((timers) => {
      const newTimers = { ...timers }
      delete newTimers[id]
      return newTimers
    })

    setTasksData((tasksData) => {
      const newTaskData = [...tasksData]
      const task = newTaskData.find((el) => el.id === id)
      task.isTimerOn = false
      return newTaskData
    })
  }

  const toggleCompleted = (id, e) => {
    if (e.target.className === 'edit' || e.target.className === 'icon icon-edit') return

    setTasksData((tasksData) => {
      const newTaskData = [...tasksData]
      const task = newTaskData.find((el) => el.id === id)
      task.completed = !task.completed
      return newTaskData
    })
  }

  const clearCompleted = () => {
    tasksData.filter((el) => el.completed).forEach((task) => deleteTask(task.id))
  }

  const handleInputChange = (id, e) => {
    setTasksData((tasksData) => {
      const newTaskData = [...tasksData]
      const task = newTaskData.find((el) => el.id === id)
      task.label = e.target.value
      return newTaskData
    })
  }

  const active = tasksData.filter((el) => !el.completed).length

  let tasks

  if (filter === 'all') {
    tasks = tasksData
  }
  if (filter === 'active') {
    tasks = tasksData.filter((el) => !el.completed)
  }
  if (filter === 'completed') {
    tasks = tasksData.filter((el) => el.completed)
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>Todos</h1>
        <NewTaskForm addTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
          handleInputChange={handleInputChange}
          timerOn={timerOn}
          timerOff={timerOff}
          saveTime={saveTime}
        />
        <Footer active={active} handleFilterChange={(filter) => setFilter(filter)} clearCompleted={clearCompleted} />
      </section>
    </section>
  )
}

export default App
