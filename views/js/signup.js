function signup_common() {
    const user_id = $('#inputUserId').val();
    const nickname = $('#inputNickname').val();
    const password = $('#inputPassword1').val();
    const confirmPassword = $('#inputPassword2').val();
    console.log(user_id, nickname, password);
    $.ajax({
    type: 'POST',
    url: '/api/signup/common',
    data: {user_id, nickname, password, confirmPassword},
    success: function (response) {
        location.href = '/'; 
    },
    error: function (error) {
    alert(error.responseJSON.errorMessage);
    },
    });
}

function signup_business() {
    const store_id = $('#inputUserId').val();
    const nickname = $('#inputNickname').val();
    const password = $('#inputPassword1').val();
    const confirmPassword = $('#inputPassword2').val();
    console.log(store_id, nickname, password, confirmPassword);
    $.ajax({
        type: 'POST',
        url: '/api/signup/business',
        data: { store_id, nickname, password, confirmPassword},
        success: function (response) {
            location.href = '/';
            alert('사장님 회원가입 성공!');
        },
        error: function (error) {
        alert(error.responseJSON.errorMessage);
        },
    });
}