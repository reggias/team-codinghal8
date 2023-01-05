window.addEventListener("DOMContentLoaded", (event) => {
  console.log("JS 파일 연결");
});

// test
function testPost() {
  $.ajax({
    type: "POST",
    url: "/review",
    data: { give_test: "this is test!" },
    // async: false,
    success: function (response) {
      console.log(response);
      alert(response["msg"]);
      window.location.reload();
    },
  });
}

// 추가 - 이미지 파일, 미리보기
const fileInput = document.querySelector("#reviewLaundryImage");
fileInput.addEventListener("change", handleFileChange);

function handleFileChange() {
  const selectedFile = fileInput.files[0];
  const fileReader = new FileReader();
  fileReader.readAsDataURL(selectedFile);
  fileReader.onload = function () {
    const previewImg = document.querySelector("#previewImg");
    if (!previewImg.src) {
      // FileReader 객체에서도 바꿔야 하는데.
      return (previewImg.src = fileReader.result);
    } else {
      if (confirm("이미지를 바꾸시겠습니까?") === true) {
        return (previewImg.src = fileReader.result);
      }
    }
  };
}

// 삭제 - 이미지 파일, 미리보기
const deleteImg = document.querySelector("#deleteImg");
deleteImg.addEventListener("click", handleDeleteImg);
function handleDeleteImg() {
  const previewImg = document.querySelector("#previewImg");
  previewImg.src = ""; // null 로 하면 api 에러가 난다. 왜 그러지?
  fileInput.value = ""; // 여기는 null로 해도 상관이 없다.
}

// reviewForm 제출
const submit = document.querySelector("#review-post");
submit.addEventListener("click", handleSubmitReviewForm);

function handleSubmitReviewForm() {
  // userId, storeId -> req.param으로 laundryId 통해 전달
  console.log("리뷰작성 폼 제출 시도!");

  // form 1. 별점 입력
  let star;
  const starPoints = document.querySelectorAll(".star-rating__input");
  for (let i = 0; i < starPoints.length; i++) {
    if (starPoints[i].checked == true) {
      star = 5 - i;
      break;
    }
  }
  // 별점 미 선택시 메시지
  console.log(`별점: ${star}`);
  if (star === -1 || star === undefined) {
    alert(`별점: ${star} -> 별점을 선택하지 않았는지 확인하세요`);
    //return error 별점을 선택하지 않았습니다.
  }

  // form 2. 세탁물 카테고리
  const laundryCategory = document.querySelector(
    "#review-post__categories > select"
  ).selectedIndex;
  // 카테고리 미 선택시 메시지
  if (laundryCategory === 0) {
    // 0: None, 1: 상의, 2: 하의, 3: 아우터, 4: 신발, 5: 이불
    return alert("세탁한 옷의 종류를 선택하지 않았습니다.");
  }
  console.log(`세탁한 옷의 종류(num): ${laundryCategory}`);

  // form 3. 리뷰 내용 작성
  const content = document.querySelector("#floatingTextarea2").value;
  console.log("리뷰 내용: ", content);

  // form 4. 세탁물 이미지 추가
  const selectedFile = fileInput.files[0];
  console.log(`selectedFile: ${selectedFile}`);

  // FormData.append
  const reviewForm = document.querySelector("#review-post__form");
  const formData = new FormData(reviewForm);

  formData.append("reviewStar", star);
  formData.append("reviewLaundryCategory", laundryCategory);
  formData.append("reviewContent", content);
  // for (img of fileInput.files) {
  //     formData.append('reviewLaundryImage', img);
  //     console.log(img);
  // }
  formData.append("reviewLaundryImage", fileInput.files[0]);
  console.log(fileInput.files[0]);

  // laundryId -> req.param.laundryId
  const laundryId = "12345laundryId";
  formData.append("reviewLaundryId", laundryId);

  $.ajax({
    type: "POST",
    url: "/api/review", // 추후 수정 /api/:laundryId/review
    data: formData,
    // async: false,
    processData: false,
    contentType: false,
    success: function (response) {
      console.log(response);
      alert(response["msg"]);
      window.location.reload();
    },
  });
}
