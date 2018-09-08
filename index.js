
var source = Rx.Observable.fromEvent(document.getElementById('input'), 'keyup');

var subscription = source
    .map(x => x.target.value)
    .subscribe(
        (x) => console.log('of: ' + x),
        (error) => console.log('Error: ' + err),
        () => console.log('Completed')
    );