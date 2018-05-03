import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const headBox = document.getElementById('head');
    const boxes = document.getElementsByClassName('box');
    const mouseDown$ = Observable.fromEvent<MouseEvent>(headBox, 'mousedown');
    const mouseMove$ = Observable.fromEvent<MouseEvent>(document, 'mousemove');
    const mouseUp$ = Observable.fromEvent<MouseEvent>(document, 'mouseup');
    const delayBoxes$ = Observable.from([].slice.call(boxes, 0))
      .zip(Observable.interval(100).startWith(0), (box) => box);

    mouseDown$.map((e) => {
        const pos = this.getTranslate(headBox);
        return {
          pos,
          event: e,
        }
      })
      .switchMap((initialState) => {
        const initialPos = initialState.pos;
        const { clientX, clientY } = initialState.event;
        return mouseMove$.map((moveEvent) => ({
            x: moveEvent.clientX - clientX + initialPos.x,
            y: moveEvent.clientY - clientY + initialPos.y,
          }))
          .takeUntil(mouseUp$)
      })
      .mergeMap((pos) => {
        return delayBoxes$.do((box) => {
          this.setTranslate(box, pos)
        })
      })
      .subscribe();
  }

  getTranslate(element) {
    const style = getComputedStyle(element);
    const regExp = /matrix\((\d+,\s){4}(\d+),\s(\d+)/i;
    const result = style.transform.match(regExp);
    if (result) {
      return {
        x: parseInt(result[2], 10),
        y: parseInt(result[3], 10)
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }

  setTranslate(element, pos) {
    element.style.transform = `translate(${pos.x}px, ${pos.y}px)`
  }
}
