import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

class Task extends React.Component {
  state = {
    editing: false,
    value: this.props.label,
  }

  static defaultProps = {
    label: 'new todo',
    completed: false,
    date: new Date(),
  }

  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    date: PropTypes.instanceOf(Date),
    completed: PropTypes.bool,
    saveValue: PropTypes.func.isRequired,
    onDeleted: PropTypes.func.isRequired,
    onToggleCompleted: PropTypes.func.isRequired,
  }

  handleEditingClick = () => {
    this.setState({
      editing: true,
    })
  }

  handleChange = (e) => {
    const newValue = e.target.value
    this.setState({
      value: newValue,
    })
  }

  handleReturn = (e) => {
    const { saveValue } = this.props
    if (e.keyCode === 27 || e.keyCode === 13) {
      this.setState({
        editing: false,
      })
      saveValue(e.target.value)
    }
  }

  render() {
    const { onDeleted, onToggleCompleted, completed, date } = this.props

    const { editing, value } = this.state

    let className = null
    let element = null
    const created = formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true,
    })

    if (completed) {
      className = 'completed'
    }

    if (editing) {
      className = 'editing'
      element = (
        <input type="text" className="edit" value={value} onChange={this.handleChange} onKeyDown={this.handleReturn} />
      )
    }

    return (
      <li className={className} onClick={onToggleCompleted}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={completed} readOnly />
          <label>
            <span className="description">{value}</span>
            <span className="created">{created}</span>
          </label>
          <button type="button" className="icon icon-edit" onClick={this.handleEditingClick} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {element}
      </li>
    )
  }
}

export default Task
