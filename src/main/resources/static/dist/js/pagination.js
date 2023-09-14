const loadDataPaginating = (pageNo) => {
  $.ajax({
    type: "GET",
    url: $host_name + "/all-tasks-pagination?pageNo=" + pageNo,
    headers: { "Content-Type": "application/json" },
    dataType: "json",
    success: function (result) {
      datafunc(result.data.data);
      pagination(result);
    },
    error: function (xmlHttpRequest, textStatus, errorThrown) {
      if (xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0) {
        warning("The server is down !");
        return;
      } else {
        error(textStatus);
        return;
      }
    },
  });
  let usernames = localStorage.getItem("user-name");
  $(".user-u").text(usernames);
  let photo = localStorage.getItem("user-photo");
  $(".user-photo").attr("src", photo);
};

const datafunc = (data) => {
  $("#table").DataTable({
    destroy: true,
    bProcessing: true,
    bDestroy: true,
    // "sPaginationType": "bootstrap", // full_numbers
    bPaginate: false, //hide pagination
    // "bFilter": false, //hide Search bar
    bInfo: false, // hide showing entries
    data: data,
    columns: [
      { data: "id" },
      { data: "title" },
      { data: "startDate" },
      { data: "endDate" },
      { data: "assignees" },
      { data: "projects" },
      { data: "description" },
      { data: "priority" },
      {
        data: "status",
        render: function (data, type, row) {
          if (data != null && data == "DRAFT")
            return '<span class="btn btn-sm btn-warning">' + data + "</span>";
          else return '<span class="btn btn-sm btn-info">Inprogress</span>';
        },
      },
      {
        data: "attachment",
        render: function (data, type, row) {
          let id = row.id;
          let file = data;
          if (data.length > 10)
            return (
              '<span><a onClick="downloadPDF(' +
              "'" +
              file +
              "'" +
              ')" class="btn btn-link"><i class="fa fa-download"></i></a></span><span><a onClick="updateTask(' +
              "'" +
              id +
              "'" +
              ')"  data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-link"><i class="fa fa-pencil"></i></a></span>'
            );
          else
            return (
              '</span><span><a onClick="updateTask(' +
              "'" +
              id +
              "'" +
              ')"  data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-link"><i class="fa fa-pencil"></i></a></span>'
            );
        },
      },
    ],
  });
};

const pagination = (data) => {
  let pagination = $("#pagination");

  pagination.empty();

  let totalPages = data.data.totalPages;
  let pageNo = data.data.pageNo;
  let list =
    '<p><nav class="pull-right" aria-label="...">' +
    '<ul class="pagination pagination-sm"><li class="page-item ' +
    (pageNo > 0 ? "" : "disabled") +
    '"><a onclick="loadDataPaginating(' +
    (pageNo - 1) +
    ')" class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a></li>';
  for (let i = 0; i < totalPages; i++) {
    list +=
      '<li class="page-item ' +
      (pageNo == i ? "active" : "") +
      '"><a onclick="loadDataPaginating(' +
      i +
      ')" class="page-link" >' +
      (i + 1) +
      "</a></li>";
  }

  list +=
    '<li class="page-item ' +
    (pageNo + 1 < totalPages ? "" : "disabled") +
    '"><a class="page-link" href="#" onclick="loadDataPaginating(' +
    (pageNo + 1) +
    ');" tabindex="-1" aria-disabled="true">Next</a></li></ul></nav></p>';
  pagination.html(list);
};
