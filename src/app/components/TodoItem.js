import React from 'react';
import {observer} from 'mobx-react';
class TodoItem extends React.Component {
  render() {
    return (
    
    );
  }
};

.defaultProps = {
};
 {todoStore.todos.map((el) => 
                      <div key={el.id}>
                        {el.text}
                      </div>
                      )}
