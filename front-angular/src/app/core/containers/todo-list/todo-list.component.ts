import { Component, OnInit, ViewChild, ElementRef,  AfterViewInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromCore from '../../store/reducers';
import { TodosActions } from '../../store/actions';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit,  AfterViewInit {

  loading$ = this.store.pipe(select(fromCore.isLoading));
  error$ = this.store.pipe(select(fromCore.getError));
  todos$ = this.store.pipe(select(fromCore.getTodos));

  textInput = '';
  faPlus = faPlus;

  @ViewChild('textTodo', {static: false}) textTodo: ElementRef;

  constructor(
    private store: Store<fromCore.State>,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(TodosActions.fetchTodos());
  }

  ngAfterViewInit() {
    this.textTodo.nativeElement.focus();
  }

  todoAdd() {
    if (this.textInput && this.textInput.trim().length > 0) {
      this.store.dispatch(TodosActions.addTodo({text: this.textInput.trim()}));
      this.textInput = '';
    }
  }

  todoUpdate(todo: Todo) {
    if (!todo) { return; }
    this.store.dispatch(TodosActions.updateTodo({todo}));
    this.textTodo.nativeElement.focus();
  }

  todoDelete(id: number) {
    if (!id) { return; }
    this.store.dispatch(TodosActions.deleteTodo({id}));
    this.textTodo.nativeElement.focus();
  }

}
