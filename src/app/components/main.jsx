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

const muiTheme = getMuiTheme({
	palette: {
		accent1Color: deepOrange500
	}
});

const TodoList = observer(({todoStore}) =>
  (
    <div>
      {todoStore.todos.map((el) => 
        <div key={el.id}>
          {el.text}
        </div>
        )}
      </div>
  )
);

const TodoAdder = observer(({todoStore, viewState}) =>
  (
    <div>
      <button onClick={
        () => {
          todoStore.createTodo(viewState.inputText);
        }
      }> Add </button>
      <input 
        onChange={(el) => viewState.changeInputText(el.target.value)} 
        value={viewState.inputText}  />
    </div>
  )
);

@observer
class Main extends React.Component {
	viewState;

	componentWillMount() {
		this.props.contactStore.loadContacts();
                this.viewState = new ViewState(this.props.contactStore, this.props.tagStore);
                this.props.todoStore.setViewState(this.viewState);
	}

	render() {
		const {contactStore, tagStore, todoStore} = this.props;
		const {viewState} = this;

		let content;
		if (isContact(viewState.selection)) {
			content = <ContactView
							contact={viewState.selection}
							viewState={viewState}
					  />;
		} else if (isTag(viewState.selection)) {
			content = <TagView tag={viewState.selection} />;
		} else {
			content = <span>"Please select a contact or tag"</span>
		}

                return (
                  <div>
                    <TodoAdder viewState={viewState} todoStore={todoStore} />
                    You have {todoStore.length} elements.
                    <TodoList todoStore={todoStore} />

                    <p>
                      Next item : {viewState.inputText} 
                    </p>
                                     </div>
		);
	}
}

export default Main;
