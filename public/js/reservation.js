let id = window.localStorage.getItem('selectedRoomId');

fetch('/rooms/' + id, {method: 'GET'}).then(response=>response.json()).then(response=>
    {
        console.log(response);
    });