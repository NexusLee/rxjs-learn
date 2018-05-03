import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-follow-mouse',
  templateUrl: './follow-mouse.component.html',
  styleUrls: ['./follow-mouse.component.css']
})
export class FollowMouseComponent implements OnInit {
  movePos: any;
  constructor() { }

  ngOnInit() {
    var imgList = document.getElementsByTagName('img');

    this.movePos = Observable.fromEvent<MouseEvent>(document, 'mousemove')
      .map(e => ({ x: e.clientX, y: e.clientY }));

    this.followMouse(Array.from(imgList))
  }

  followMouse(DOMArr) {
    let self = this;
    const delayTime = 600;
    DOMArr.forEach((item, index) => {
      self.movePos
        .delay(delayTime * (Math.pow(0.65, index) + Math.cos(index / 4)) / 2)
        .subscribe(function (pos){
          item.style.transform = 'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0)';
        });
    });
  }
}
