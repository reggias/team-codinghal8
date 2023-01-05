$(document).ready(function () {
  get_laundry_list();
});

function get_laundry_list() {
  $.ajax({
    type: "GET",
    url: "/api/laundry",
    data: {},
    success: function (response) {
      // console.log(response["service"]);
      let rows = response["service"];
      for (let i = 0; i < rows.length; i++) {
        let id = rows[i]['id'];
        let store_id = rows[i]['store_id'];
        let nickname = rows[i]['nickname'];
        let address = rows[i]['address'];
        let img = rows[i]['img'];
        let memo = rows[i]['memo'];
        if (store_id == null) {
          let temp_html = `<tr>
                            <td class="service-nickname">
                              <p>${nickname}</p>
                            </td>
                            <td class="service-address">
                              <p>${address}</p>
                            </td>
                            <td class="service-img">
                              <img src="../views/img/${img}" class="imgsize">
                            </td>
                            <td class="service-memo">
                              <div class="cart_quantity_button">
                                <p>${memo}</p>
                              </div>
                            </td>
                            <td class="service-state">
                              <button type="button" class="btn btn-warning" onclick="put_laundry_apply(${id})">세탁진행</button>
                            </td>
                          </tr>`;
          $("#service-list").append(temp_html);
        } else {
          let temp_html = `<tr>
                            <td class="service-nickname">
                              <p>${nickname}</p>
                            </td>
                            <td class="service-address">
                              <p>${address}</p>
                            </td>
                            <td class="service-img">
                              <img src="../views/img/${img}" class="imgsize">
                            </td>
                            <td class="service-memo">
                              <div class="cart_quantity_button">
                                <p>${memo}</p>
                              </div>
                            </td>
                            <td class="service-state">
                              <button type="button" class="btn btn-warning">상태변경</button>
                            </td>
                          </tr>`;
          $("#service-apply").append(temp_html);
        }
      }
    }
  })
}

function put_laundry_apply(id) {
  $.ajax({
    type: "PUT",
    url: `/api/laundry/${id}`,
    data: {},
    success: function (response) {
      // console.log(response);
      if (response == "message") {
        alert(response["message"]);
      } else {
        alert(response["errorMessage"]);
      }
      window.location.reload();
    }
  })
}