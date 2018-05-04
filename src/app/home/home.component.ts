import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs'
//import { create } from "rxjs-spy";
import "rxjs-spy/add/operator/tag";

import {
  mockHttpPost,
  createTodoItem,
  mockToggle,
  search,
  HttpResponse
} from '../lib/lib'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    //const spy = create();

    const clearInputSubject$ = new Subject<void>();

    const $input: any = document.querySelector('.todo-val');
    const $list = document.querySelector('.list-group');

    const $add = document.querySelector('.button-add');

    var keyDowns$: any = Observable.fromEvent($input, 'keydown');

    var clickAdd$: any = Observable.fromEvent($add, 'click');

    var enter$: any = keyDowns$
      .filter(r => r.keyCode === 13);

    var item$ = Observable
      .merge(enter$, clickAdd$)
      .map(() => $input.value)
      .filter(r => r !== '')
      .distinct(null, clearInputSubject$)
      .switchMap(mockHttpPost)
      .map(createTodoItem)
      .do((ele: HTMLLIElement) => {
        console.log(ele);
        $list.appendChild(ele);
        $input.value = '';
        clearInputSubject$.next()
      });

    const toggle$ = item$.mergeMap($todoItem => {
        return Observable.fromEvent<MouseEvent>($todoItem, 'click')
          .filter(e => e.target === $todoItem)
          .mapTo($todoItem)
      })
      .do(($todoItem: HTMLElement) => {
        if ($todoItem.classList.contains('done')) {
          $todoItem.classList.remove('done')
        } else {
          $todoItem.classList.add('done')
        }
      });

    const search$ = keyDowns$.debounceTime(200)
      .filter(evt => evt.keyCode !== 13)
      .map(result => (<HTMLInputElement>result.target).value)
      .switchMap(search)
      .do((result: HttpResponse | null) => {
         const actived = document.querySelectorAll('.active');
         Array.prototype.forEach.call(actived, (item: HTMLElement) => {
           item.classList.remove('active')
         });
         if (result) {
           const item = document.querySelector(`.todo-item-${result._id}`);
           item.classList.add('active')
         }
    });

    const app$ = toggle$.merge( search$ )
      .do(r => {
        console.log(r)
      });

    app$.subscribe();

    //spy.log('item');

    const addButton = document.getElementById('addButton');
    const minusButton = document.getElementById('minusButton');
    const state = document.getElementById('state');

    const addClick = Observable.fromEvent<MouseEvent>(addButton, 'click').mapTo(1);
    const minusClick = Observable.fromEvent<MouseEvent>(minusButton, 'click').mapTo(-1);


    const numberState = Observable.empty()
      .startWith(0)
      .merge(addClick, minusClick)
      .scan((origin:number, next:number) => origin + next, 0);

    numberState
      .subscribe({
        next: (value:string) => { state.innerHTML = value;},
        error: (err) => { console.log('Error: ' + err); },
        complete: () => { console.log('complete'); }
      });

    const button = document.getElementById('demo');
    const click = Observable.fromEvent(button, 'click')
    const buffer = click
      .bufferTime(500)
      .filter(arr => arr.length >= 2);

    buffer.subscribe({
      next: (value) => { console.log('success'); },
      error: (err) => { console.log('Error: ' + err); },
      complete: () => { console.log('complete'); }
    });


    function getPostData() {
      return fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(res => res.json())
    }
    /*var source = Observable.fromEvent<MouseEvent>(document.body, 'click');

    var example = source.concatMap(
      e => Observable.from(getPostData()),
      (e, res, eIndex, resIndex) => {
        console.log(e)
        console.log(res)
        return res.title
      });

    example.subscribe({
      next: (value) => { console.log(value); },
      error: (err) => { console.log('Error: ' + err); },
      complete: () => { console.log('complete'); }
    });*/

    /*var source = Observable.fromEvent<MouseEvent>(document.body, 'click');

    var example = source.switchMap(
      e => Observable.from(getPostData()));

    example.subscribe({
      next: (value) => { console.log(value); },
      error: (err) => { console.log('Error: ' + err); },
      complete: () => { console.log('complete'); }
    });*/

    var source = Observable.fromEvent<MouseEvent>(document.body, 'click');

    var example = source.mergeMap(
      e => Observable.from(getPostData()));

    example.subscribe({
      next: (value) => { console.log(value); },
      error: (err) => { console.log('Error: ' + err); },
      complete: () => { console.log('complete'); }
    });
  }
}
