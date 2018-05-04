import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule }     from './app.routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DragComponent } from './drag/drag.component';
import { YoukuComponent } from './youku/youku.component';
import { FollowMouseComponent } from './follow-mouse/follow-mouse.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DragComponent,
    YoukuComponent,
    FollowMouseComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
