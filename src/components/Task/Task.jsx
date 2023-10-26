import React, { useEffect, useState } from 'react'
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
  stopDate,
  saveTime,
  // timerOn,
  // timerOff,
}) => {
  const [startDate, setStartDate] = useState(date)
  const diff = stopDate === 0 ? 0 : Date.parse(startDate) / 1000 - Date.parse(stopDate) / 1000
  const [edit, setEdit] = useState(false)
  const [timeLeft, setTimeLeft] = useState(time)
  const [isTimerOn, setIsTimerOn] = useState(true)

  //console.log(time, Date.parse(date) / 1000, Date.parse(new Date()) / 1000)

  useEffect(() => {
    const timer = setInterval(() => {
      if (isTimerOn) {
        setTimeLeft(() => {
          console.log(Date.parse(startDate) / 1000)
          const dateOfStart = Date.parse(startDate) / 1000
          const now = Date.parse(new Date()) / 1000
          console.log(time, now, diff)
          return time - (now - dateOfStart)
        })
      }
    }, 1000)

    saveTime(timeLeft)

    return () => {
      clearInterval(timer)
    }
  }, [isTimerOn])

  const handleStop = () => {
    saveTime(timeLeft)
    setIsTimerOn(false)
  }

  // const getPadTime = (time) => {
  //   return time.toString().padStart(2, '0')
  // }

  const taskClass = classNames({
    completed: edit ? false : completed,
    editing: edit,
  })

  //const min = getPadTime(Math.floor(timeLeft / 60))
  //const sec = getPadTime(timeLeft - min * 60)

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
                <button
                  className="icon icon-play"
                  onClick={() => {
                    setStartDate(new Date())
                    console.log('setStartDate', new Date())
                    setIsTimerOn(true)
                  }}
                ></button>
                <button className="icon icon-pause" onClick={handleStop}></button>
                {timeLeft}
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
