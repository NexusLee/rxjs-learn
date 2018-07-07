import { Component, OnInit } from '@angular/core';
import { Observable }  from "rxjs";
import { from }  from "rxjs/observable/from";
import { of }  from "rxjs/observable/of";
import { interval }  from "rxjs/observable/interval";
import { map, merge, mergeMap }  from "rxjs/operators";


@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const interval$ = interval(2000);
    let cube = document.querySelector('.cube');
    let source = of(cube);
    source.pipe(
      mergeMap(
        v => interval$, (e: any, res:any) => {
          if(res % 2 === 0){
            e.style.transform = `translate(100px, 0)`
          }else {
            e.style.transform = `translate(0, 0)`
          }
        }
      )
    ).subscribe();
  }

}
