// CountdownTimer.js
import React from 'react';
import Countdown from 'react-countdown';
import moment from 'moment-timezone';


const CountdownTimer = () => {
  // Set the countdown duration in milliseconds (e.g., 5 minutes)
  // const countdownTime = 29 * 55000 * 1000; // 5 minutes
  // const endDate = new Date('2024-11-03T00:00:00'); // End date: November 3, 2024
  const endDate = moment.tz('2024-11-03 12:00', 'America/New_York').toDate()

  // Renderer function for the countdown
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      return (
        <div className='countdowncontainer'>
          <div className='countdown'>
            <h3>{days}</h3>
            <span>days</span>
          </div>
          <div className='countdown'>
            <h3>{hours}</h3>
            <span>Hours</span>
          </div>
          <div className='countdown'>
            <h3>{minutes}</h3>
            <span>minutes</span>
          </div>
          <div className='countdown'>
            <h3>{seconds}</h3>
            <span>seconds</span>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <Countdown date={endDate} renderer={renderer} />
    </div>
  );
};

export default CountdownTimer;
