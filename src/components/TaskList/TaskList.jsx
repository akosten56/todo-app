import React from 'react'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ tasks, deleteTask, toggleCompleted, handleInputChange, timerOn, timerOff }) => {
  const elements = tasks.map(({ id, ...props }) => (
    <Task
      key={id}
      {...props}
      deleteTask={(e) => deleteTask(id, e)}
      toggleCompleted={(e) => toggleCompleted(id, e)}
      handleInputChange={(e) => handleInputChange(id, e)}
      timerOn={(e) => timerOn(id, e)}
      timerOff={(e) => timerOff(id, e)}
    />
  ))

  return <ul className="todo-list">{elements}</ul>
}

export default TaskList
