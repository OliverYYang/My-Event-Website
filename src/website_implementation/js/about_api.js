$(document).ready(function () {

    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/movies/')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    console.log(data);
                    $('.movie-all span').html(data.length);
                    $.each(data, function (indexInArray, item) {
                        let html = `<li id="${item.id}">
                            <img src="${item.image_url}" alt="">
                            <div class="movie-dec">
                                <p>${item.title}</p>
                                <p>${item.description}</p>
                            </div>
                        </li>`;
                        $('.news-movie-list ul').append(html);
                    });
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });


    function status(response) {
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
        } else {
            return Promise.reject(new Error(response.statusText))
        }
    }

    function json(response) {
        return response.json()
    }


    function timestampToTime(timestamp) {
        timestamp = timestamp ? timestamp : null;
        let date = new Date(timestamp); //time10*1000，13!= *1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        return Y + M + D + h + m;
    }

    $('#formSmt').click(function (e) {
        e.preventDefault();
        let jsonData = {}
        jsonData.event_name = $('#event_name').val();
        jsonData.location = $('#location').val();
        jsonData.organiser = $('#organiser').val();
        jsonData.event_type = $('#event_type').val();
        jsonData.description = $('#description').val();
        jsonData.date_time = timestampToTime(Date.parse(new Date()));
        jsonData.genericevent_photo = null;
        jsonData.website_code = $('#website_code').val();
        if(!jsonData.event_name || !jsonData.location || !jsonData.organiser || !jsonData.event_type || !jsonData.description || !jsonData.website_code){
            alert('error');
            return;
        }
        console.log(jsonData);
        fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/', {
                method: 'post',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(jsonData)
            })
            .then(json)
            .then(function (data) {
                alert('Request succeeded with JSON response');
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    });
});