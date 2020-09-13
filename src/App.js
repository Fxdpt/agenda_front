import React, { Component } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

export class App extends Component {
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  state = {
    date: new Date()
  }

  onChange = (date, event) => {
    this.setState({date})
    const formatedDate = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()

    console.log(date,formatedDate)
  }

  handleClick = (e) => {

  }

  render() {
    return (
      <div>
        <Calendar value={this.state.date} onChange={this.onChange} locale="fr-FR" onClickDay={this.handleClick}/>
      </div>
    )
  }
}

export default App
