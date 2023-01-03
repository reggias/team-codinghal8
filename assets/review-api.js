window.addEventListener('DOMContentLoaded', (event) => {
    console.log('JS 파일 연결');
});

// test
function testPost() {
    $.ajax({
        type: 'POST',
        url: '/review',
        data: { give_test: 'this is test!' },
        // async: false,
        success: function (response) {
            console.log(response);
            alert(response['msg']);
            window.location.reload();
        },
    });
}

// 이미지 파일 미리보기
const fileInput = document.querySelector('#formFileMultiple');
fileInput.addEventListener('change', handleFiles);

function handleFiles() {
    const selectedFiles = [...fileInput.files];
    console.log(`selectedFiles: ${selectedFiles}`);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(selectedFiles[0]);
    fileReader.onload = function () {
        document.querySelector('#previewImg').src = fileReader.result;
    };
}

// reviewForm 제출
const submit = document.querySelector('#review-post');
submit.addEventListener('click', submitReviewPost);

function submitReviewPost() {
    // userId, storeId -> req.param으로 laundryId 통해 전달
    console.log('리뷰작성 폼 제출 시도!');

    let star;
    const starPoints = document.querySelectorAll('.star-rating__input');
    for (let i = 0; i < starPoints.length; i++) {
        if (starPoints[i].checked == true) {
            star = 5 - i;
            break;
        }
    }

    // const starPoint1 = document.querySelector("#rate5").checked
    // const starPoint2 = document.querySelector("#rate4").checked
    // const starPoint3 = document.querySelector("#rate3").checked
    // const starPoint4 = document.querySelector("#rate2").checked
    // const starPoint5 = document.querySelector("#rate1").checked

    // const starPointsArray = [starPoint1, starPoint2, starPoint3, starPoint4, starPoint5]
    // const star = starPointsArray.indexOf(True)
    console.log(`별점: ${star}`);
    if (star === -1 || star === undefined) {
        alert(`별점: ${star} -> 별점을 선택하지 않았는지 확인하세요`);
        //return error 별점을 선택하지 않았습니다.
    }

    // 세탁물 카테고리
    const laundryCategory = document.querySelector(
        '#review-post__categories > select',
    ).selectedIndex;
    // 0: None, 1: 상의, 2: 하의, 3: 아우터, 4: 신발, 5: 이불
    if (laundryCategory === 0) {
        //return error 세탁한 옷의 종류를 선택하지 않았습니다.
    }
    console.log(`세탁한 옷의 종류(num): ${laundryCategory}`);

    // 리뷰 내용 작성
    const content = document.querySelector('#floatingTextarea2').value;
    console.log(content);

    // 이미지
    const selectedFiles = [...fileInput.files];
    console.log(`selectedFiles: ${selectedFiles}`);

    // Form
    const reviewForm = document.querySelector('#review-post__form');
    const formData = new FormData(reviewForm);

    formData.append('reviewStar', star);
    formData.append('reviewLaundryCategory', laundryCategory);
    formData.append('reviewContent', content);
    formData.append('reviewLaundryImages', selectedFiles);

    // laundryId
    // const urlArray = document.location.href.split("/")
    // const laundryId = urlArray[urlArray.length - 1]
    const laundryId = '12345laundryId';
    formData.append('reviewLaundryId', laundryId);

    $.ajax({
        type: 'POST',
        url: '/review',
        data: { give_test: 'this is test!' },
        // async: false,
        success: function (response) {
            console.log(response);
            alert(response['msg']);
            window.location.reload();
        },
    });
}
