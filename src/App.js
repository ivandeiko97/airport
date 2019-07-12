import React, {Component} from 'react';
import './App.css'
import FlightList from './components/FlightList/FlightList';
import IconSVG from './components/svgComponents/IconSVG';



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departure: null,
      arrival: null,
      date: null,
      displayTable: 'DEPARTURES',
      selectedDay: null,
      loaded: false
    };
    this.changedDisplayTable = this.changedDisplayTable.bind(this)
  };
  
  getCurrentDate(number, day) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate() + number;
  
    this.setState({
      ...this.state,
      date: `${currentDay.toString().padStart(2, '0')}-${currentMonth.toString().padStart(2, '0')}-${currentYear}`,
      selectedDay: day
    });
  };

  changedDisplayTable(e) {
    const display = e.target.outerText;
    if (e.target.nodeName === 'LABEL') {
      this.setState( {
        ...this.state,
        displayTable: display
      })
    } else {
        return null;
    }
  };

  loadApi(url) {
    return fetch(url)
      .then(data => data.json())
      .then(data => data.body)
      .then(({arrival, departure}) => {
        this.setState({
          ...this.state,
          loaded: true,
          arrival: arrival.filter(item => this.filterFlight(this.state.date, item.timeArrExpectCalc)),
          departure: departure.filter(item => this.filterFlight(this.state.date, item.timeDepExpectCalc))
        }); 
      });
  };
  
  filterFlight(currDate, flightDate) {
    const currentDay = +currDate.split('-')[0]
    const flightDay = new Date(flightDate).getDate();
    return flightDay === currentDay;
  };

  componentDidMount() {
    this.getCurrentDate(0, 'today');
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.date !== prevState.date) {
      this.loadApi(`https://api.iev.aero/api/flights/${this.state.date}`);
    };
  };

  getDayAndMonth(num = 0) {
    const date = new Date();
    const day = date.getDate() + num;
    const month = date.getMonth() + 1;

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
  }
  

  render() {
    if (this.state.loaded) {
      return (
        <div className="flightsPage">
          <section className="changedDisplayTable">
            <label
               className={this.state.displayTable === "DEPARTURES" ? 'selectedDisplay' : ''} 
               onClick={(e) => this.changedDisplayTable(e)}
            > 
             <IconSVG class="down" background={this.state.displayTable === "DEPARTURES" ? '#1eb7ee' : 'white'}/>
              DEPARTURES   
            </label>
            
            <label
              className={this.state.displayTable === "ARRIVALS" ? 'selectedDisplay' : ''}
              onClick={(e) => this.changedDisplayTable(e)}
            >
              <IconSVG class="up" background={this.state.displayTable === "ARRIVALS" ? '#1eb7ee' : 'white'}/>
              ARRIVALS
            </label>
          </section>
          <section className="buttonChangedDay">
            <button
              className={this.state.selectedDay === 'yesterday' ? 'selectedDay' : ''}
              onClick={this.getCurrentDate.bind(this, -1, 'yesterday')}>
              <div>{this.getDayAndMonth(-1)}</div>
              Yesterday
            </button>
            <button
             className={this.state.selectedDay === 'today' ? 'selectedDay' : ''}
             onClick={this.getCurrentDate.bind(this, 0, 'today')}>
               <div>{this.getDayAndMonth()}</div>
               Today
             </button>
            <button
              className={this.state.selectedDay === 'tommorow' ? 'selectedDay' : ''}
              onClick={this.getCurrentDate.bind(this, +1, 'tommorow')}> 
                <div>{this.getDayAndMonth(1)}</div>
                Tommorow
              </button>
          </section>  
          <FlightList flightItems={this.state.displayTable === 'DEPARTURES' ? this.state.departure : this.state.arrival}/>
        </div>
     );
    } else {
      return null;
    }
  };
};
