export interface Point2D {
  x: number;
  y: number;
}

export interface Directions {
  [key: number]: Point2D;
}

export enum Key {
  LEFT = 37,
  RIGHT = 39,
  UP = 38,
  DOWN = 40
}

export interface Scene {
  snake: Array<Point2D>;
  apples: Array<Point2D>;
  score: number;
}
