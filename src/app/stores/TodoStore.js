import * as superagent from 'superagent';
import {observable, computed, action} from "mobx";
import {v4} from 'node-uuid';

export class Todo{
  id;
  viewState;
  @observable text;
  @observable finished;

  constructor(text, finished = false) {
    this.id = v4();
    this.text = text;
    this.finished = finished;
  }
}

export class TodoStore {
  @observable todos = [
    new Todo('Todo 1'),
    new Todo('Todo 2')
  ];

  constructor() {
  }

  @computed get length() {
    return this.todos.length;
  }

  @action setViewState(viewState) {
    this.viewState = viewState;
  }

  @action createTodo(text) {
    let todo = new Todo(text);
    this.todos.push(todo);
    this.viewState.changeInputText('');
    return todo;
  }

  @computed get finishedTodos() {
    return todo.filter( (el) => el.done === true);
  }

  @computed get unFinishedTodos() {
    return todo.filter( (el) => el.done === false);
  }
}
