import React, { useState, useEffect } from 'react'
import './TasksFilter.css'

const TasksFilter = ({ handleFilterChange }) => {
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    handleFilterChange(filter)
  }, [filter])

  return (
    <ul className="filters">
      <li>
        <button type="button" className={filter === 'all' ? 'selected' : null} onClick={() => setFilter('all')}>
          All
        </button>
      </li>
      <li>
        <button type="button" className={filter === 'active' ? 'selected' : null} onClick={() => setFilter('active')}>
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={filter === 'completed' ? 'selected' : null}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TasksFilter
