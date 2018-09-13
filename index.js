const token = '2324ff2ff752bc2afdd5a5d93a6e6717bda0707b2042c9610892739b17e301887d6225a74ffe71166ac3a';
const vk_version = '&v=5.1';

function getMethodVK(id, method, prop) {
    console.log('https://api.vk.com/method/' + method + '?' + $.param(getParams(id, prop)) + vk_version);
    return $.ajax({
        url: 'https://api.vk.com/method/' + method + '?' + $.param(getParams(id, prop)) + vk_version,
        type: 'GET',
        dataType: 'JSONP'
    }).promise();
}

function getParams(id, params) {
    params['access_token'] = token;
    params['user_ids'] = id;
    return params;
}

Rx.Observable.fromEvent($('input'), 'keyup')
    .pluck('target', 'value')
    .distinct()
    .debounce(2000)
    .mergeMap(v => Rx.Observable.fromPromise(getMethodVK(v, 'friends.search', {count: 5, fields: 'photo_100,online'})))
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
    //console.log(valueTextArea);
    Rx.Observable.fromPromise(getMethodVK('messages.send', {user_id: 340936561, message: 'Hello'}))
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
    console.log(user.items[0]);
    for (var i = 0; i < user.count; i++){
        var data = user.items[i];
        //var online = data.online ? 'online' : 'offline';
        html += '<li>' +
            '<a target="_blank" href="http://vk.com/id' + data.id + '">'
            +'<img src="' + data.photo_100 + '">'
                +'<div>'
                    +'<h4>' + data.first_name + ' ' + data.last_name + '</h4>'
                    //+'<p>' + online + '</p>'

                +'</div>'
            +'</a>'
            +'<textarea data-textarea="'+i+'" rows="7" cols="20"></textarea>'
            +'<div><button class="btn-send" data-uid="'+data.id+'">Написать</button></div>'
            + '</li>'
            +'<hr>';
    }
    $('ul').html(html);
}