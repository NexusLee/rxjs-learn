import { Observer } from './observer'

export class Observable {
  _subscribe: any;
  constructor(subscribe) {
    if(subscribe) {
      this._subscribe = subscribe;
    }
  }

  subscribe(observerOrNext, error?, complete?) {
    const observer = new Observer(observerOrNext, error, complete);
    this._subscribe(observer);
    return observer;
  }

  static create(subscribe) {
    return new Observable(subscribe);
  }
}
