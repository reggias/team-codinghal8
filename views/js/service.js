$(document).ready(function () {
  get_laundry_list();
});

function get_laundry_list() {
  $.ajax({
    type: "GET",
    url: "/api/laundry",
    data: {},
    success: function (response) {
      // console.log(response["serviceList"]);
      let rows = response["serviceList"];
      for (let i = 0; i < rows.length; i++) {
        let nickname = rows[i]['nickname'];
        let address = rows[i]['address'];
        let img = rows[i]['img'];
        let memo = rows[i]['memo'];
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
                            <button type="button" class="btn btn-warning">세탁진행/상태변경</button>
                          </td>
                        </tr>`;
        $("#service-list").append(temp_html);
      }
    }
  })
}