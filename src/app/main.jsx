/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observer} from 'mobx-react';

const TimerDisplay = ({timer}) => {
  return (
    <p style={{fontSize: 15}}>
      {timer.display}
    </p>
  );
};

const Main = observer(({timerStore}) => {
  let firstButton;
  let secondButton;

  if (!timerStore.isRunning) {
    secondButton = (
      <button
        style={{width: 40, height: 40}}
        onClick={() => timerStore.startTimer()}
      >
        Start
      </button>
    );

    firstButton = (
      <button
        style={{width: 40, height: 40}}
        onClick={() => timerStore.resetTimer()}
      >
        Reset
      </button>
    );
  } else {
    secondButton = (
      <button
        style={{width: 40, height: 40}}
        onClick={() => timerStore.stopTimer()}
      >
        Stop
      </button>
    );

    firstButton = (
      <button
        style={{width: 40, height: 40}}
        onClick={() => timerStore.lapTimer()}
      >
        Lap
      </button>
    );
  }

  return (
    <div style={{fontSize: 30}}>
      <p>
        Display: {timerStore.mainDisplay}
      </p>
      {firstButton}
      {secondButton}
      <p style={{fontSize: 20}}>
        Laps:
      </p>
      <div>
        {timerStore.laps.reverse().map((el) => <TimerDisplay key={el.id} timer={el} />)}
      </div>
    </div>
  );
});

export default Main;
