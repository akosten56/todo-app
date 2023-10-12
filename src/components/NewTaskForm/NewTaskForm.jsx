import React from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  state = {
    titleValue: '',
    minValue: '',
    secValue: '',
    invalid: false,
    showTimer: true,
  }

  static propTypes = {
    onAdded: PropTypes.func.isRequired,
  }

  handleTitleChange = (e) => {
    const newValue = e.target.value
    this.setState({
      titleValue: newValue,
    })
  }

  handleMinChange = (e) => {
    const newValue = e.target.value
    this.setState({
      minValue: newValue,
    })
  }

  handleSecChange = (e) => {
    const newValue = e.target.value
    this.setState({
      secValue: newValue,
    })
  }

  handleReturn = (e) => {
    e.preventDefault()
    const { onAdded } = this.props
    const { titleValue, minValue, secValue } = this.state
    const min = Number(minValue.trim())
    const sec = Number(secValue.trim())

    if (isNaN(min) || isNaN(sec) || min > 59 || sec > 59) {
      this.setState({
        invalid: true,
      })
      return
    }

    let time = min * 60 + sec

    let showTimer = true
    if (time == 0) {
      time = null
      showTimer = false
    }

    onAdded(titleValue, time, showTimer)
    this.setState({
      titleValue: '',
      minValue: '',
      secValue: '',
      invalid: false,
    })
  }

  render() {
    const { titleValue, minValue, secValue, invalid } = this.state

    return (
      <form className={invalid ? 'new-todo-form invalid' : 'new-todo-form'} onSubmit={this.handleReturn}>
        <input className="new-todo" placeholder="Task" value={titleValue} onChange={this.handleTitleChange} />
        <input className="new-todo-form__timer" placeholder="Min" value={minValue} onChange={this.handleMinChange} />
        <input className="new-todo-form__timer" placeholder="Sec" value={secValue} onChange={this.handleSecChange} />
        <input type="submit" style={{ display: 'none' }} />
      </form>
    )
  }
}

export default NewTaskForm
