import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { animationFrame } from 'rxjs/scheduler/animationFrame';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';

import {
  map,
  filter,
  scan,
  startWith,
  distinctUntilChanged,
  share,
  withLatestFrom,
  tap,
  skip,
  switchMap,
  takeWhile,
  first
} from 'rxjs/operators';

import { SNAKE_LENGTH, SPEED, POINTS_PER_APPLE, DIRECTIONS, FPS } from './constant'
import { createCanvasElement, renderScene, renderGameOver } from './canvas'
import { nextDirection, move, generateSnake, eat, generateApples, isGameOver } from './utils'
import { Key, Point2D } from './types'

@Component({
  selector: 'app-taming-snake',
  templateUrl: './taming-snake.component.html',
  styleUrls: ['./taming-snake.component.css']
})
export class TamingSnakeComponent implements OnInit {

  INITIAL_DIRECTION: any;

  constructor() {
    this.INITIAL_DIRECTION = DIRECTIONS[Key.RIGHT];

  }

  ngOnInit() {
    let canvas = createCanvasElement();
    let ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    let click$ = fromEvent(document, 'click');
    let keydown$ =  fromEvent(document, 'keydown');

    let directions$ = keydown$.pipe(
      map((event: KeyboardEvent) => DIRECTIONS[event.keyCode]),
      filter(direction => !!direction),
      scan(nextDirection),
      startWith(this.INITIAL_DIRECTION),
      distinctUntilChanged()
    );

    let length$ = new BehaviorSubject<number>(SNAKE_LENGTH);

    let snakeLength$ = length$.pipe(
      scan((step, snakeLength) => snakeLength + step),
      share()
    );

    let score$ = snakeLength$.pipe(
      startWith(0),
      scan((score, _) => score + POINTS_PER_APPLE)
    );

    let ticks$ = Observable.interval(SPEED);

    let snake$ = ticks$.pipe(
      withLatestFrom(directions$, snakeLength$, (_, direction, snakeLength) => [direction, snakeLength]),
      scan(move, generateSnake()),
      share()
    );

    let apples$ = snake$.pipe(
      scan(eat, generateApples()),
      distinctUntilChanged(),
      share()
    );

    let appleEaten$ = apples$.pipe(
      skip(1),
      tap(() => length$.next(POINTS_PER_APPLE))
    ).subscribe();

    let scene$ = Observable.combineLatest(snake$, apples$, score$, (snake, apples, score) => ({ snake, apples, score}));

   /* const game$ = interval(1000 / FPS, animationFrame)
      .withLatestFrom(scene$, (_, scene) => scene)
      .takeWhile(scene => !isGameOver(scene))
      .subscribe({
        next: (scene) => renderScene(ctx, scene),
        complete: () => renderGameOver(ctx)
      });*/

    let game$ = of('Start Game').pipe(
      map(() => interval(1000 / FPS, animationFrame)),
      withLatestFrom(scene$, (_, scene) => scene),
      takeWhile(scene => !isGameOver(scene))
    );

    const startGame = () => game$.subscribe({
      next: (scene) => renderScene(ctx, scene),
      complete: () => {
        renderGameOver(ctx);
        click$.pipe(first()).subscribe(startGame);
      }
    });

    startGame();
  }
}
