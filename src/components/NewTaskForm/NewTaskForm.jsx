import React from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

class NewTaskForm extends React.Component {
  state = {
    value: '',
  }

  static propTypes = {
    onAdded: PropTypes.func.isRequired,
  }

  handleChange = (e) => {
    const newValue = e.target.value
    this.setState({
      value: newValue,
    })
  }

  handleReturn = (e) => {
    const { onAdded } = this.props
    const { value } = this.state

    if (e.keyCode === 13 && value !== '') {
      onAdded(value, e)
      this.setState({
        value: '',
      })
    }
  }

  render() {
    const { value } = this.state
    return (
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={this.handleChange}
        onKeyDown={this.handleReturn}
        value={value}
      />
    )
  }
}

export default NewTaskForm
