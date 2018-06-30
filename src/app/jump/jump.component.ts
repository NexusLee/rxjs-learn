import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs/observable/interval';
import { take, scan } from 'rxjs/operators';

@Component({
  selector: 'app-jump',
  templateUrl: './jump.component.html',
  styleUrls: ['./jump.component.css']
})
export class JumpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const delta = Math.abs(30 - 20);
    const sign = Math.sign(30 - 20);
    const numberIncrease = Math.floor(delta / 10);
    const timeIncrease = 300 / 10;

    interval(timeIncrease).pipe(
      take(10),
      scan((acc) => acc + (numberIncrease * sign), 30)
    ).subscribe({
      next: (n) => {
        console.log(n)
      },
      // 用complete保证数字最终会变为end
      complete: () => {
        console.log(20)
      },
    });
  }

}
