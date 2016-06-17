/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observer} from 'mobx-react';
import {TimerDisplay} from './TimerDisplay';
import {buttonStyle, mainStyle} from './styles';

const Main = observer(({timerStore}) => {
  let firstButton;
  let secondButton;

  if (!timerStore.isRunning) {
    secondButton = (
      <button
        style={{...buttonStyle, color: '#4bd761'}}
        onClick={() => timerStore.startTimer()}
      >
        start
      </button>
    );

    firstButton = (
      <button
        style={buttonStyle}
        onClick={() => timerStore.resetTimer()}
      >
        reset
      </button>
    );

    if (!timerStore.hasStarted) {
      firstButton = null;
    }
  } else {
    secondButton = (
      <button
        style={{...buttonStyle, color: '#fd3d2a'}}
        onClick={() => timerStore.stopTimer()}
      >
        stop
      </button>
    );

    firstButton = (
      <button
        style={buttonStyle}
        onClick={() => timerStore.lapTimer()}
      >
        lap
      </button>
    );
  }

  return (
    <div style={{fontSize: 30}}>
      <div
        style={mainStyle.display}
      >
        {timerStore.mainDisplay}
      </div>
      <div>
        <div style={mainStyle.buttons}>
          {firstButton}
          {secondButton}
        </div>
        <div>
          {timerStore.lapData.map((el) =>
            <TimerDisplay
              key={el.lap.id}
              leftText={el.text}
              rightText={el.lap.display}
            />
            )}
        </div>
      </div>
    </div>
  );
});

export default Main;
