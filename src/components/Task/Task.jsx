import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'

const Task = ({
  label,
  completed,
  date,
  showTimer,
  time,
  saveValue,
  onToggleCompleted,
  onDeleted,
  timerOn,
  timerOff,
}) => {
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(label)

  const handleReturn = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      setEdit(false)
      saveValue(e.target.value)
    }
  }

  let className = null
  let element = null
  if (completed) {
    className = 'completed'
  } else if (edit) {
    className = 'editing'
    element = (
      <input
        type="text"
        className="edit"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleReturn}
      />
    )
  }

  let convertedTime
  if (time) {
    let min = Math.floor(time / 60)
    let sec = time - min * 60
    sec.toString().length == 1 ? (sec = `0${sec}`) : null
    convertedTime = `${min}:${sec}`
  }

  const created = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: true,
  })

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
        <button type="button" className="icon icon-edit" onClick={() => setEdit(true)} />
        <button type="button" className="icon icon-destroy" onClick={onDeleted} />
      </div>
      {element}
    </li>
  )
}

Task.defaultProps = {
  label: 'new todo',
  completed: false,
  date: new Date(),
}

Task.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.instanceOf(Date),
  completed: PropTypes.bool,
  saveValue: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleCompleted: PropTypes.func.isRequired,
}

export default Task
