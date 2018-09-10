function getUserById(id) {
    const params = {
        access_token: 'acab1c4d26c4103715a983b69feacb919a8cf51a2ddb4c69b709bbd217c1004f81900130d24299c499754',
        user_ids: id,
        fields: 'count,photo_100,online'
    };
    return $.ajax({
        url: 'https://api.vk.com/method/friends.search?' + $.param(params) + '&v=5.1',
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
    .map(x => x.response)
    .subscribe(
        (user) => {
            getList(user);
        },
        error => console.log(error),
        () => console.log('Completed')
    );

function getList(user) {
    var html = '';
    for (var i = 0; i < user.count; i++){
        var data = user.items[i];
        var online = data.online ? 'online' : 'offline';
        html += '<li>' +
            '<a target="_blank" href="http://vk.com/id' + data.id + '">'
            +'<img src="' + data.photo_100 + '">'
                +'<div>'
                    +'<h4>' + data.first_name + ' ' + data.last_name + '</h4>'
                    +'<p>' + online + '</p>'
                    +'<button>Написать</button>'
                +'</div>'
            +'</a>'
            + '</li>';
    }
    $('ul').html(html);
}