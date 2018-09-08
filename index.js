/*
Rx.Observable.of([1, 2, 3, 4, 5, 'vfv'], 12, 'string')
    .subscribe(
        (x) => console.log('of: ' + x),
        (error) => console.log('Error: ' + err),
        () => console.log('Completed')
    );
*/

Rx.Observable.of('aa', 'bb', 'vv')
    .map(x => {
        return {
            value: x,
            f: x.length
        };
    })
    .subscribe(
        (x) => console.log(x.f)
    );