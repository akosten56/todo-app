import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'
import './TaskList.css'

const TaskList = ({ tasks, onDeleted, onToggleCompleted, saveValue, timerOn, timerOff }) => {
  const elements = tasks.map(({ id, ...props }) => (
    <Task
      key={id}
      {...props}
      onDeleted={(e) => onDeleted(id, e)}
      onToggleCompleted={(e) => onToggleCompleted(e, id)}
      saveValue={(value) => saveValue(id, value)}
      timerOn={(e) => timerOn(id, e)}
      timerOff={(e) => timerOff(id, e)}
    />
  ))

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  tasks: [],
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
  saveValue: PropTypes.func.isRequired,
}

export default TaskList
