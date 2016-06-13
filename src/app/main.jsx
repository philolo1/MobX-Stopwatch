/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observer} from 'mobx-react';

const TimerDisplay = ({timer, text}) => {
  return (
    <div
      style={{
        borderBottom: '1px solid #d9dae0',
        display: 'flex',
      }}
    >
      <div
        style={{fontSize: 30,
          fontFamily: 'HelveticaNeue-UltraLight',
          color: '#7f8083',
          padding: 20,
          flex: 1,
        }}
      >
        {text}
      </div>
      <div
        style={{fontSize: 30,
          padding: 20,
          fontFamily: 'HelveticaNeue-UltraLight',
          color: '#7f8083',
        }}
      >
        {timer.display}
      </div>
    </div>
  );
};

const ButtonStyle = {
  fontFamily: 'HelveticaNeue-UltraLight',
  fontSize: 20,
  width: 72,
  height: 72,
  margin: 24,
  padding: 0,
  cursor: 'pointer',
  letterSpacing: 1,
  border: 0,
  borderRadius: '50%',
  outline: 'none',
  background: 'white',
};

const Main = observer(({timerStore}) => {
  let firstButton;
  let secondButton;

  if (!timerStore.isRunning) {
    secondButton = (
      <button
        style={{...ButtonStyle, color: '#4bd761'}}
        onClick={() => timerStore.startTimer()}
      >
        start
      </button>
    );

    firstButton = (
      <button
        style={ButtonStyle}
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
        style={{...ButtonStyle, color: '#fd3d2a'}}
        onClick={() => timerStore.stopTimer()}
      >
        stop
      </button>
    );

    firstButton = (
      <button
        style={ButtonStyle}
        onClick={() => timerStore.lapTimer()}
      >
        lap
      </button>
    );
  }

  return (
    <div style={{fontSize: 30}}>
      <div
        style={{
          background: 'white',
          height: 120,
          fontSize: 60,
          fontFamily: 'HelveticaNeue-UltraLight',
          border: 'solid #cecfd0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'}}
      >
        {timerStore.mainDisplay}
      </div>
      <div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {firstButton}
          {secondButton}
        </div>
        <div>
          {timerStore.lapData.map((el) =>
            <TimerDisplay
              key={el.lap.id}
              timer={el.lap}
              text={el.text}
            />
            )}
        </div>
      </div>
    </div>
  );
});

export default Main;
