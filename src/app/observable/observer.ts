const emptyObserver = {
  next: () => {},
  error: (err) => { throw err; },
  complete: () => {}
};

export class Observer {
  destination: any;
  isStopped: Boolean;
  constructor(destinationOrNext, error?, complete?){
    switch(arguments.length) {
      case 0:
        this.destination = this.safeObserver(emptyObserver);
        break;
      case 1:
          if(!destinationOrNext) {
            this.destination = this.safeObserver(emptyObserver);
            break;
          }
          if(destinationOrNext instanceof Observer){
            this.destination = destinationOrNext;
            break;
          }
          if( typeof  destinationOrNext === 'object') {
            this.destination = this.safeObserver(destinationOrNext);
            break;
          }
      default:
        this.destination = this.safeObserver(destinationOrNext, error, complete);
        break;
    }
  }

  safeObserver(observerOrNext, error?, complete?) {
    let next;

    if( typeof (observerOrNext) === 'function') {
      next = observerOrNext;
    } else if(observerOrNext) {
      next = observerOrNext.next || (() => {});
      error = observerOrNext.error || function(err) {
        throw err
      };
      complete = observerOrNext.complete || (() => {});
    }

    return {
      next: next,
      error: error,
      complete: complete
    }
  }

  next(value) {
    if(!this.isStopped && this.next) {
      try {
        this.destination.next(value);
      } catch (err) {
        this.unsubscribe();
        throw err;
      }
    }
  }

  error(err) {
    if(!this.isStopped && this.error) {
      try {
        this.destination.error(err);
      } catch (anotherError) {
        throw anotherError;
      }
      this.unsubscribe();
    }
  }

  complete() {
    if(!this.isStopped && this.complete) {
      try {
        this.destination.complete()
      } catch (err) {
        this.unsubscribe();
        throw err;
      }
      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.isStopped = true;
  }
}
