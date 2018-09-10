function getUserById(id) {
    const params = {
        access_token: 'acab1c4d26c4103715a983b69feacb919a8cf51a2ddb4c69b709bbd217c1004f81900130d24299c499754',
        user_ids: id,
        fields: 'photo_100,online'
    };

    return $.ajax({
        url: 'https://api.vk.com/method/users.get?' + $.param(params) + '&v=5.1',
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
            /*var online = user.online ? 'online' : 'offline';
            $('ul').html(`
                <li>${user.first_name} ${user.last_name}</li> 
                <li>id = ${user.id}</li> 
                <li>status = ${online}</li>
            `);*/
            var online = user.online ? 'online' : 'offline';
            $('a').attr('href','http://vk.com/id' + user.id);
            $('h4').html(`${user.first_name} ${user.last_name}`);
            $('p').html(`${online}`);
            $('img').attr('src', user.photo_100);

        },
        error => console.log(error),
        () => console.log('Completed')
    );