import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter'
import './Footer.css'

const Footer = ({ active, chooseAll, chooseActive, chooseCompleted, clearCompleted }) => (
  <footer className="footer">
    <span className="todo-count">{active} items left</span>
    <TasksFilter chooseAll={chooseAll} chooseActive={chooseActive} chooseCompleted={chooseCompleted} />
    <button type="button" className="clear-completed" onClick={clearCompleted}>
      Clear completed
    </button>
  </footer>
)

Footer.defaultProps = {
  active: 0,
  chooseAll: () => {},
  chooseActive: () => {},
  chooseCompleted: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  active: PropTypes.number,
  chooseAll: PropTypes.func,
  chooseActive: PropTypes.func,
  chooseCompleted: PropTypes.func,
  clearCompleted: PropTypes.func,
}

export default Footer
