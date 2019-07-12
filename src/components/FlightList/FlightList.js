import React from 'react';
import Flight from '../Flight/Flight';
import './flightList.css';

export default function FlightList(props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Terminal</th>
          <th>Local Time</th>
          <th>Destination</th>
          <th>Status</th>
          <th>Airline</th>
          <th>Flight</th>
        </tr>
      </thead>
      <tbody>
        {props.flightItems.map(item => { 
          return <Flight key={item.ID} flight={item}/>
        })}
      </tbody>
    </table>
  )
}
