import React from 'react'

export default function Status(props) {
  let status;
  const time = new Date(props.flight.timeTakeofFact)
  const hours = time.getHours().toString();
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const timefact = `${hours}:${minutes}`;
  switch (props.flight.status) {
    case 'DP':
      status = `Departed at ${timefact}`;
      break;
    case 'CX':
      status = 'Cancelled';
      break;
    case 'BD':
      status = 'In boarding';
      break;
    case 'DL':
      status = 'Delayed';
      break;
    case 'CK':
      status = 'Check in';
      break;
    case 'LN':
      status = `Landed ${timefact}`;
      break;
    default: status = 'On time';
  };

  return (
    <td>{status}</td>
  );
};
