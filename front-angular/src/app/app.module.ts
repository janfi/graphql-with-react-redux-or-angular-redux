import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { reducers, metaReducers } from './core/store/reducers';
import { effects } from './core/store/effects';

import { RootComponent, CoreModule } from './core/core.module';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    CoreModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      name: 'PRDK App',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
