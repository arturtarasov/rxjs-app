function getUserById(id, method, fields) {
    const params = {
        access_token: '2324ff2ff752bc2afdd5a5d93a6e6717bda0707b2042c9610892739b17e301887d6225a74ffe71166ac3a',
        user_ids: id,
        fields: fields
    };
    return $.ajax({
        url: 'https://api.vk.com/method/' + method + '?' + $.param(params) + '&v=5.1',
        type: 'GET',
        dataType: 'JSONP'
    }).promise();
}

function getUserById2(id, method, fields) {
    const params = {
        access_token: '2324ff2ff752bc2afdd5a5d93a6e6717bda0707b2042c9610892739b17e301887d6225a74ffe71166ac3a',
        user_ids: id,
        message: fields
    };
    return $.ajax({
        url: 'https://api.vk.com/method/' + method + '?' + $.param(params) + '&v=5.1',
        type: 'POST',
        dataType: 'JSONP'
    }).promise();
}

Rx.Observable.fromEvent($('input'), 'keyup')
    .pluck('target', 'value')
    .distinct()
    .debounce(2000)
    .mergeMap(v => Rx.Observable.fromPromise(getUserById(v, 'friends.search', 'count,photo_100,online')))
    .catch(error => Rx.Observable.of(error))
    .map(x => x.response)
    .subscribe(
        (user) => {
            getList(user);
        },
        error => console.log(error),
        () => console.log('Completed')
    );

$(document).on('click', '.btn-send', function (event) {
    event.preventDefault();
    var uid = +$(event.target).data('uid');
    //var valueTextArea = $(event.target).data('textarea');
    console.log(valueTextArea);
    Rx.Observable.fromPromise(getUserById2('340936561', 'messages.send', 'Hi'))
        .distinct()
        .debounce(2000)
        //.catch(error => Rx.Observable.of(error))
        .map(x => x)
        .subscribe(
            (x) => console.log(x),
            error => console.log(error),
            () => console.log('Completed')
        );
});

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

                +'</div>'
            +'</a>'
            +'<textarea data-textarea="'+i+'" rows="7" cols="20"></textarea>'
            +'<div><button class="btn-send" data-uid="'+data.id+'">Написать</button></div>'
            + '</li>'
            +'<hr>';
    }
    $('ul').html(html);
}