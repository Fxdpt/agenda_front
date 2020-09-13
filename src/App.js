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
        this.setState({ currentDayObject: res.data })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /**
   * If day is Friday
   *  Get all workHours for 4 previous day (from MON to THU)
   *  Sum Workhours then substract 38.5 to them
   *    set currentDayObject properties based on startTime 9 and endTime as result of substract
   *    Post it to database
   */

  formatTimeDisplay = (isoStringTime) => {
    const dateTime = new Date(isoStringTime)
    return ("0"+dateTime.getHours()).slice(-2) + ":" + ("0"+dateTime.getMinutes()).slice(-2)
  }

  render() {
    let currentDayContainer;
    if (this.state.currentDayObject) {
      const currentDay = this.state.currentDayObject
      currentDayContainer = <div>
        <p>Début: {this.formatTimeDisplay(currentDay.startTime)}</p>
        <p>Fin: {this.formatTimeDisplay(currentDay.endTime)}</p>
    <p>Repas: {currentDay.lunchTime / 60} heure</p>
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
