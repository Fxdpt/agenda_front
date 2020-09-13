import React, { Component } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
const axios = require('axios').default;

export class App extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }
  state = {
    date: new Date(),
    currentDayObject: null
  }

  onChange = (date) => {
    this.setState({ date })
    const formatedDate = date.getFullYear() + "-" + (
      (date.getMonth() + 1) < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1
    ) + "-" + date.getDate()

    axios.get('http://localhost:3000/day/by_date/' + formatedDate)
      .then((res) => {
        console.log(res)
        this.setState({ currentDayObject: res.data })
        console.log(this.state.currentDayObject)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    let currentDayContainer;
    if (this.state.currentDayObject) {
      const currentDay = this.state.currentDayObject
      currentDayContainer = <div>
        <p>Début :{currentDay.startTime}</p>
        <p>Fin : {currentDay.endTime}</p>
        <p>Repas : {currentDay.lunchTime}</p>
      </div>
    }
    return (
      <div>
        <Calendar value={this.state.date} onChange={this.onChange} locale="fr-FR" />
        {currentDayContainer}
      </div>
    )
  }
}

export default App
