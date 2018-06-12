import { Component, OnInit } from '@angular/core';

import { Observer } from './observer'
import { Observable } from './observable'

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var observable = Observable.create(function(observer){
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
      observer.next('not work');
    });

    var observer = {
      next: function (value) {
        console.log(value)
      },
      complete: function() {
        console.log('complete')
      }
    };

    observable.subscribe(observer)
  }

}
