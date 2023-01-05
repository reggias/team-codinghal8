function logout(){
    $.ajax({
        type: 'POST',
        url: '/api/logout',
        data: {id, password},
        success: function (response) {
            location.href = '';

            alert('로그아웃 성공!');
        },
        error: function (error) {
        alert(error.responseJSON.errorMessage);
        },
        });
}