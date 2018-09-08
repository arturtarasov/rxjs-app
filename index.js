function getUserById(id) {
    const params = {
        access_token: '0039a8a0debac447d8c2c165fa7fab325e7826e19b2a0f8806d63bcd2ab32e3d49db6568ca1b51a30730b',
        user_ids: id,
        fields: 'photo_big'
    };

    return $.ajax({
        url: 'https://api.vk.com/method/users.get?' + $.param(params) + '&v=3.0',
        type: 'GET',
        dataType: 'JSONP'
    }).promise();
}

Rx.Observable.fromEvent($('input'), 'keyup')
    .pluck('target', 'value')
    .distinct()
    .debounce(2000)
    .mergeMap(v => Rx.Observable.fromPromise(getUserById(v)))
    .catch(error => Rx.Observable.of(error))
    .map(x => x.response[0])
    .subscribe(
        (user) => {
            $('h1').html(`${user.first_name} ${user.last_name} <i>${user.uid}</i>`);
            $('img').attr('src', user.photo_big);
        },
        error => console.log(error),
        () => console.log('Completed')
    );