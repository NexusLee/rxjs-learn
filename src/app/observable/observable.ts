import { Observer } from './observer'
import {MapObserver} from "./mapObserver";

export class Observable {
  _subscribe: any;
  operator: any;
  source: any;
  constructor(subscribe?) {
    if(subscribe) {
      this._subscribe = subscribe;
    }
  }

  subscribe(observerOrNext, error?, complete?) {
    const observer = new Observer(observerOrNext, error, complete);

    if(this.operator) {
      this.operator.call(observer, this.source);
    }else {
      this._subscribe(observer);
    }
    return observer;
  }

  static create(subscribe) {
    return new Observable(subscribe);
  }

  static fromArray(array) {
    if(!Array.isArray(array)) {
      throw new Error('params need to be an array');
    }
    return new Observable(function(observer){
      try{
        array.forEach(value => observer.next(value));
        observer.complete();
      } catch(err) {
        observer.error(err)
      }
    })
  }

  map(callback) {
    const observable = new Observable();
    observable.source = this;
    observable.operator = {
      call: (observer, source) => {
        const newObserver = new MapObserver(observer, callback);
        return source.subscribe(newObserver);
      }
    };

    return observable;
  }
}
