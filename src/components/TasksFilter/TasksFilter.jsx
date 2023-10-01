import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

const TasksFilter = ({ chooseAll, chooseActive, chooseCompleted }) => (
  <ul className="filters">
    <li>
      <button type="button" className="selected" onClick={chooseAll}>
        All
      </button>
    </li>
    <li>
      <button type="button" onClick={chooseActive}>
        Active
      </button>
    </li>
    <li>
      <button type="button" onClick={chooseCompleted}>
        Completed
      </button>
    </li>
  </ul>
)

TasksFilter.propTypes = {
  chooseAll: PropTypes.func.isRequired,
  chooseActive: PropTypes.func.isRequired,
  chooseCompleted: PropTypes.func.isRequired,
}

export default TasksFilter
