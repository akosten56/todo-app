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

  handleDelete = (e) => {
    this.props.onDeleted(e)
  }

  render() {
    const { onToggleCompleted, completed, date, showTimer, time, onDeleted, timerOn, timerOff } = this.props
    const { editing, value } = this.state

    let convertedTime
    if (time) {
      let min = Math.floor(time / 60)
      let sec = time - min * 60
      sec.toString().length == 1 ? (sec = `0${sec}`) : null
      convertedTime = `${min}:${sec}`
    }

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
          <div>
            <span className="title">{value}</span>
            <span className="description">
              {showTimer ? (
                <>
                  <button className="icon icon-play" onClick={timerOn}></button>
                  <button className="icon icon-pause" onClick={timerOff}></button>
                </>
              ) : null}
              {convertedTime}
            </span>
            <span className="description">{created}</span>
          </div>
          <button type="button" className="icon icon-edit" onClick={this.handleEditingClick} />
          <button type="button" className="icon icon-destroy" onClick={onDeleted} />
        </div>
        {element}
      </li>
    )
  }
}

export default Task
