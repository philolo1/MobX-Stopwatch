/**
 * In this file, we create a React component
 * which incorporates components providedby material-ui.
 */

import React from 'react';
import {observer} from 'mobx-react';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/lib/styles/colors';
import DevTools from 'mobx-react-devtools';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';

import {ViewState} from '../stores/view-state';
import {isTag} from '../stores/tag-store';
import {isContact} from '../stores/contact-store';

import {ContactsOverview} from './contacts-overview';
import {TagsOverview} from './tags-overview';
import {ContactView} from './contact-view';
import {TagView} from './tag-view';

const TimerDisplay = ({timer}) => {
  return (
    <p style={{fontSize: 15}}>
      {timer.display}
    </p>
  );
};

const Timer = observer(({timerStore}) => {

  let firstButton;
  let secondButton;

  if (!timerStore.isRunning) {
    secondButton = (
      <button 
        style={{width: 40, height: 40}} 
        onClick={() => timerStore.startTimer()}>
        Start
      </button>
    );

    firstButton = (
      <button 
        style={{width: 40, height: 40}} 
        onClick={() => timerStore.resetTimer()}>
        Reset 
      </button>
    );
  } else {
    secondButton = (
      <button 
        style={{width: 40, height: 40}} 
        onClick={() => timerStore.stopTimer()}>
        Stop 
      </button>
    );

    firstButton = (
      <button 
        style={{width: 40, height: 40}} 
        onClick={() => timerStore.lapTimer()}>
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
          {timerStore.laps.reverse().map((el) => <TimerDisplay key={el.id} timer={el} / >)}
        </div>
    </div>
  );
});

@observer
class Main extends React.Component {

	render() {
		const {timerStore} = this.props;

                return (
                  <div>
                    <Timer timerStore={timerStore} />
                  </div>
		);
	}
}

export default Main;
