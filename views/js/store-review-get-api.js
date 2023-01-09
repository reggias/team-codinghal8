window.addEventListener('DOMContentLoaded', (event) => {
    console.log('store-review-get.JS 파일 연결');
});

// 뒤로가기 - 세탁물 상태조회(개인)
const goToMainBtn = document.querySelector('#btn-back');
goToMainBtn.addEventListener('click', backToMain);
function backToMain() {
    window.location.href = `/`;
}
