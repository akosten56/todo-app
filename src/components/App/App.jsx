import React from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

export default class App extends React.Component {
  state = {
    tasksData: [],
    filterBy: 'all',
    active: 0,
    invalid: false,
  }

  id = 10

  timerId = {}

  addTask = (value, time, showTimer = true) => {
    const dateOfCreation = new Date()
    this.setState(({ tasksData, active }) => {
      const newTask = {
        id: this.id++,
        label: value,
        completed: false,
        date: dateOfCreation,
        time: time,
        isTimerOff: true,
        showTimer: showTimer,
      }

      if (time) this.timerOn(newTask.id)

      const newTaskData = [...tasksData, newTask]

      return {
        tasksData: newTaskData,
        active: active + 1,
      }
    })
  }

  deleteTask = (id, e) => {
    e ? e.stopPropagation() : null
    this.timerOff(id)
    this.setState(({ tasksData }) => {
      const i = tasksData.findIndex((el) => el.id === id)
      const newTaskData = [...tasksData]

      newTaskData.splice(i, 1)

      return {
        tasksData: newTaskData,
      }
    })
  }

  timerOn = (id, e) => {
    e ? e.stopPropagation() : null
    const isTimerOff = this.state.tasksData.find((el) => el.id === id)
      ? this.state.tasksData.find((el) => el.id === id).isTimerOff
      : true
    if (isTimerOff) {
      this.timerId[id] = setInterval(() => {
        this.setState(({ tasksData }) => {
          const newTaskData = [...tasksData]
          const task = newTaskData.find((el) => el.id === id)
          task.time = task.time - 1
          console.log(task.time)
          task.isTimerOff = false
          return {
            tasksData: newTaskData,
          }
        })
      }, 1000)
    }
  }

  timerOff = (id, e) => {
    e ? e.stopPropagation() : null
    clearInterval(this.timerId[id])
    this.setState(({ tasksData }) => {
      const newTaskData = [...tasksData]
      const task = newTaskData.find((el) => el.id === id)
      task.isTimerOff = true
      return {
        tasksData: newTaskData,
      }
    })
  }

  onToggleCompleted = (e, id) => {
    if (e.target.className === 'edit' || e.target.className === 'icon icon-edit') {
      return
    }

    this.setState(({ tasksData, active }) => {
      const newTaskData = [...tasksData]
      const task = newTaskData.find((el) => el.id === id)
      task.completed = !task.completed

      return {
        tasksData: newTaskData,
        active: task.completed ? active - 1 : active + 1,
      }
    })
  }

  chooseAll = (e) => {
    e.target.className = 'selected'
    e.target.parentNode.nextSibling.firstChild.className = ''
    e.target.parentNode.nextSibling.nextSibling.firstChild.className = ''

    this.setState({
      filterBy: 'all',
    })
  }

  chooseActive = (e) => {
    e.target.className = 'selected'
    e.target.parentNode.previousSibling.firstChild.className = ''
    e.target.parentNode.nextSibling.firstChild.className = ''

    this.setState({
      filterBy: 'active',
    })
  }

  chooseCompleted = (e) => {
    e.target.className = 'selected'
    e.target.parentNode.previousSibling.firstChild.className = ''
    e.target.parentNode.previousSibling.previousSibling.firstChild.className = ''

    this.setState({
      filterBy: 'completed',
    })
  }

  clearCompleted = () => {
    this.state.tasksData.filter((el) => el.completed === true).forEach((task) => this.deleteTask(task.id))
  }

  saveValue = (id, value) => {
    this.setState(({ tasksData }) => {
      const newTaskData = [...tasksData]
      const task = newTaskData.find((el) => el.id === id)
      task.label = value

      return {
        tasksData: newTaskData,
      }
    })
  }

  render() {
    const { filterBy, tasksData, invalid } = this.state

    const active = tasksData.filter((el) => !el.completed).length

    let tasks

    if (filterBy === 'all') {
      tasks = tasksData
    }
    if (filterBy === 'active') {
      tasks = tasksData.filter((el) => el.completed === false)
    }
    if (filterBy === 'completed') {
      tasks = tasksData.filter((el) => el.completed === true)
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onAdded={this.addTask} invalid={invalid} />
        </header>
        <section className="main">
          <TaskList
            tasks={tasks}
            onDeleted={this.deleteTask}
            onToggleCompleted={this.onToggleCompleted}
            saveValue={this.saveValue}
            timerOn={this.timerOn}
            timerOff={this.timerOff}
          />
          <Footer
            active={active}
            chooseAll={this.chooseAll}
            chooseActive={this.chooseActive}
            chooseCompleted={this.chooseCompleted}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}
