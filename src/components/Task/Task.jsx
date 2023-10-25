import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './Task.css'
import classNames from 'classnames'

const Task = ({
  label,
  completed,
  date,
  showTimer,
  time,
  handleInputChange,
  toggleCompleted,
  deleteTask,
  timerOn,
  timerOff,
}) => {
  const [edit, setEdit] = useState(false)

  const getPadTime = (time) => {
    return time.toString().padStart(2, '0')
  }

  const taskClass = classNames({
    completed: edit ? false : completed,
    editing: edit,
  })

  const min = getPadTime(Math.floor(time / 60))
  const sec = getPadTime(time - min * 60)

  const created = formatDistanceToNow(date, { addSuffix: true, includeSeconds: true })

  return (
    <li className={taskClass} onClick={toggleCompleted}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} readOnly />
        <div>
          <span className="title">{label}</span>
          <span className="description">
            {showTimer ? (
              <>
                <button className="icon icon-play" onClick={timerOn}></button>
                <button className="icon icon-pause" onClick={timerOff}></button>
                {`${min}:${sec}`}
              </>
            ) : null}
          </span>
          <span className="description">{created}</span>
        </div>
        <button type="button" className="icon icon-edit" onClick={() => setEdit(true)} />
        <button type="button" className="icon icon-destroy" onClick={deleteTask} />
      </div>
      {edit ? (
        <input
          type="text"
          className="edit"
          value={label}
          onChange={handleInputChange}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === 'Escape' ? setEdit(false) : null)}
        />
      ) : null}
    </li>
  )
}

export default Task
