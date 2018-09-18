//var tok222 = '61b9f2782a744de0898abca540cbd59d', // я уже давал ссылку чуть выше
//    userid2222 = 8201875575, // ID пользователя, можно выкопать в исходном HTML, можно использовать спец. сервисы либо просто смотрите следующий пример
var tok = '61b9f2782a744de0898abca540cbd59d',
    username = '2rchick', // имя пользователя
    kolichestvo = 4;

$.ajax({ // первый ajax запрос возвратит нам ID пользователя
    url: 'https://api.instagram.com/v1/users/search',
    dataType: 'jsonp',
    type: 'GET',
    data: {access_token: tok, q: username}, // по сути это просто поиск пользователя по его имени
    success: function(result){
        console.log(result);
        $.ajax({
            url: 'https://api.instagram.com/v1/users/' + result.data[0].id + '/media/recent', // указываем ID первого найденного
            dataType: 'jsonp',
            type: 'GET',
            data: {access_token: tok, count: kolichestvo},
            success: function(result2){
                console.log(result2);
                for(x in result2.data){
                    $('ul').append('<li><img src="'+result2.data[x].images.thumbnail.url+'"></li>');
                }
            },
            error: function(result2){
                console.log(result2);
            }
        });
    },
    error: function(result){
        console.log(result);
    }
});
