
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './containers/app/app.component';
import { TodoListComponent } from './containers/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

export const RootComponent: any = AppComponent;

export const COMPONENTS = [
  AppComponent,
  TodoListComponent,
  TodoItemComponent
];

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {}
