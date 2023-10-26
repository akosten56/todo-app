import React from 'react'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ tasks, deleteTask, toggleCompleted, handleInputChange, timerOn, timerOff, saveTime }) => {
  const elements = tasks.map(({ id, stopDate = 0, ...props }) => (
    <Task
      key={id}
      {...props}
      stopDate={stopDate}
      deleteTask={(e) => deleteTask(id, e)}
      toggleCompleted={(e) => toggleCompleted(id, e)}
      handleInputChange={(e) => handleInputChange(id, e)}
      timerOn={(e) => timerOn(id, e)}
      timerOff={(e) => timerOff(id, e)}
      saveTime={(time) => saveTime(id, time)}
    />
  ))

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
