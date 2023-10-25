import React from 'react'

import TasksFilter from '../TasksFilter'
import './Footer.css'

const Footer = ({ active, handleFilterChange, clearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">{active} items left</span>
    <TasksFilter handleFilterChange={handleFilterChange} />
    <button type="button" className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
)

export default Footer
