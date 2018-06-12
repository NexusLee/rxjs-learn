import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DragComponent } from './drag/drag.component';
import { YoukuComponent } from './youku/youku.component';
import { FollowMouseComponent } from './follow-mouse/follow-mouse.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { ObservableComponent } from './observable/observable.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'youku',  component: YoukuComponent },
  { path: 'drag',  component: DragComponent },
  { path: 'follow-mouse',  component: FollowMouseComponent },
  { path: 'autocomplete',  component: AutocompleteComponent },
  { path: 'observable',  component: ObservableComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
