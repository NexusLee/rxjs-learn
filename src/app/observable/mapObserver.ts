import { Observer } from './observer'

export class MapObserver extends Observer {
  callback: any;
  constructor(observer, callback) {
    super(observer);
    this.callback = callback;
    this.next = this.next.bind(this);
  }
  next(value) {
    try {
      this.destination.next(this.callback(value));
    } catch (err) {
      this.destination.error(err);
      return;
    }
  }
}
