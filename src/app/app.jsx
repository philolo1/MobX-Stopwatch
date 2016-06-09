import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/main';

import {ContactStore} from './stores/contact-store';
import {TagStore} from './stores/tag-store';
import {TodoStore} from './stores/TodoStore';
import {TimerStore} from './stores/TimerStore';

import {useStrict} from 'mobx';

useStrict(true);

//Needed for onTouchTap
injectTapEventPlugin();

const tagStore = new TagStore();
const contactStore = new ContactStore(tagStore);
const todoStore = new TodoStore(); 
const timerStore = new TimerStore();

ReactDOM.render(
	<Main
		contactStore={contactStore}
                tagStore={tagStore}
                todoStore={todoStore}
                timerStore={timerStore}
	/>,
	document.getElementById('app')
);
