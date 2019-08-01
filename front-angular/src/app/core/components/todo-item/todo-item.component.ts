import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output() update = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  todoUpdate(todo: Todo) {
    todo.completed = !todo.completed;
    this.update.emit(todo);
  }

  todoDelete(id: number) {
    this.delete.emit(id);
  }
}
