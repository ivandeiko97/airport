import React from 'react'
import Status from '../status/Status';

export default function FlightDeparture(props) {
  const time = new Date(props.flight.actual);
  const minutes = time.getMinutes();
  const localTime = `${time.getHours()}:${minutes >= 10 ? minutes : '0' + minutes}`;
  return (
    <tr>
      <td className="terminal">
        <span className={'terminal' + props.flight.term}>{props.flight.term}</span>
      </td>
      <td>{localTime}</td>
      <td>{props.flight['airportToID.city_en'] || props.flight['airportFromID.city_en']}</td>
      <Status flight={props.flight}/>
      <td className="airline">
        {props.flight.codeShareData.map(item => {
          return <span key={item.airline.en.name}>
          <img className="airlineLogo" src={item.airline.en.logoSmallName} alt="airline logo"/>
          {item.airline.en.name}</span>
        })}
      </td>
      <td className="codeShare">
        {props.flight.codeShareData.map(item => {
          return <span className="spCodeShare" key={item.codeShare}>{item.codeShare}</span>
        })}
      </td>
    </tr>
  );
};
