const newApply = document.querySelector('#applybutton')
newApply.addEventListener('click', new_apply)
const image = document.querySelector('#applyImage');

function new_apply() {
    let phone = $('phone').val();
    let address = $('address').val();
    // let image = $('image').val();
    // const selectedImage = image.files[0];
    // console.log(`selectedImage: ${selectedImage}`);
    // formData
    const applyForm = document.querySelector("form");
    const formData = new FormData(applyForm);

    let category = $('category').val();
    let memo = $('memo').val();

    formData.append('phone_give', phone)
    formData.append('address_give', address)
    formData.append('applyImage', image.files[0])
    formData.append('category_give', category)
    formData.append('memo_give', memo)
    
    $.ajax({
      type: "POST",
      url: "/api/${user_id}/apply",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        alert(response["msg"]);
        window.location.href='/';
      }
    })
}