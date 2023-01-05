const { SHOWINDEXES } = require("sequelize/types/query-types");

function loginUser(){
    const id =  $('#loginUserId').val();
    const password =  $('#loginPassword').val();
    console.log(id,password)

    $.ajax({
        type: 'POST',
        url: '/api/login/common',
        data: {id, password},
        success: function (response) {
            location.href = '/'
            $('#logout').css('display','show');
            $('#login').css('display','none');
            alert('로그인 성공!');
        },
        error: function (error) {
        alert(error.responseJSON.errorMessage);
        },
        });
    }

    function loginBoss(){
        const id =  $('#loginUserId').val();
        const password =  $('#loginPassword').val();
        console.log(id,password)
    
        $.ajax({
            type: 'POST',
            url: '/api/login/business',
            data: {id, password},
            success: function (response) {
                location.href = '/';
                // $('.logout-button').css('display','show');
                // $('#login').css('display','none');
                // var logout = document.querySelector('#logout');
                // var login = document.querySelector('#login');
                // logout.style.display = 'block';
                // login.style.display = 'none';
                alert('로그인 성공!');
            },
            error: function (error) {
            alert(error.responseJSON.errorMessage);
            },
            });
        }

        function logout(){
            $.ajax({
                type: 'POST',
                url: '/api/logout',
                data: {id, password},
                success: function (response) {
                    location.href = '/';
     
                    alert('로그아웃 성공!');
                },
                error: function (error) {
                alert(error.responseJSON.errorMessage);
                },
                });
        }