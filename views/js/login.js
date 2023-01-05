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
                alert('로그인 성공!');
            },
            error: function (error) {
            alert(error.responseJSON.errorMessage);
            },
            });
        }

    