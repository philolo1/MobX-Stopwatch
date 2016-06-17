import React from 'react';
import {observer} from 'mobx-react';
import {timerStyle} from './styles';

export const TimerDisplay = observer(({timer, leftText}) => {
  return (
    <div style={timerStyle.main} >
      <div style={timerStyle.left} >
        {leftText}
      </div>
      <div style={timerStyle.right} >
        {timer.display}
      </div>
    </div>
  );
});
