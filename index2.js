function createSubscribe(name) {
    return {
        next(x) {
            console.log(name, ': ', x);
        },
        error(err) {
            console.log('Error: ', x);
        },
        complete() {
            console.log(name, ' completed');
        }
    }
}

//Rx.Observable.fromEvent(document.querySelector('input'), 'keyup')
//    .map(e => e.target.value)
//    .distinct()
//    .subscribe(createSubscribe('debounceTime'));

Rx.Observable.from([1, 2, 3, 3, 3, 5, 5, 1, 1, 99, 99, 2, 4, 6])
    .distinctUntilChanged()
    subscribe(createSubscribe('from'))