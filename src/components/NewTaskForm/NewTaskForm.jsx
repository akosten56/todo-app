import React, { useState } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onAdded }) => {
  const [titleValue, setTitleValue] = useState('')
  const [minValue, setMinValue] = useState('')
  const [secValue, setSecValue] = useState('')
  const [invalid, setInvalid] = useState(false)

  const handleReturn = (e) => {
    e.preventDefault()
    const min = Number(minValue.trim())
    const sec = Number(secValue.trim())

    if (isNaN(min) || isNaN(sec) || min > 59 || sec > 59) {
      setInvalid(true)
      return
    }

    let time = min * 60 + sec

    let showTimer = true
    if (time == 0) {
      time = null
      showTimer = false
    }

    onAdded(titleValue, time, showTimer)
    setTitleValue('')
    setMinValue('')
    setSecValue('')
    setInvalid(false)
  }

  return (
    <form className={invalid ? 'new-todo-form invalid' : 'new-todo-form'} onSubmit={handleReturn}>
      <input
        className="new-todo"
        placeholder="Task"
        value={titleValue}
        onChange={(e) => setTitleValue(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={secValue}
        onChange={(e) => setSecValue(e.target.value)}
      />
      <input type="submit" style={{ display: 'none' }} />
    </form>
  )
}

NewTaskForm.propTypes = {
  onAdded: PropTypes.func.isRequired,
}

export default NewTaskForm
