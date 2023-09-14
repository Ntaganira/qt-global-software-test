let $host_name = "http://" + window.location.host;

let projects = [];

let projectSection = $("#projects-section");

const success = (message) => {
  swal("Success !", message, "success");
};

const error = (message) => {
  swal("Ooops !", message, "error");
};

const warning = (message) => {
  swal("Ooops !", message, "warning");
};

$(document).ready(function () {
  const success = (message) => {
    swal("Success !", message, "success");
  };

  const error = (message) => {
    swal("Ooops !", message, "error");
  };

  const warning = (message) => {
    swal("Ooops !", message, "warning");
  };

  const loadData = () => {
    $.ajax({
      type: "GET",
      url: $host_name + "/all-tasks",
      headers: { "Content-Type": "application/json" },
      dataType: "json",
      success: function (data) {
        localStorage.setItem("user-id", data.user.id);

        localStorage.setItem("user-firstName", data.user.firstName);

        localStorage.setItem("user-photo", data.user.photo);

        localStorage.setItem("user-lastName", data.user.lastName);

        localStorage.setItem("user-gender", data.user.gender);

        localStorage.setItem("user-username", data.user.username);

        localStorage.setItem("user-password", data.user.password);

        localStorage.setItem(
          "user-name",
          data.user.firstName + " " + data.user.lastName
        );
        localStorage.setItem("user-photo", data.user.photo);
        datafunc(data.data);
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

  loadData();
  let pageNo = 0;
  loadDataPaginating(pageNo);

  const registerTask = (task) => {
    $.ajax({
      type: "POST",
      url: $host_name + "/create-task",
      dataType: "json",
      headers: { "Content-Type": "application/json", charset: "utf-8" },
      data: JSON.stringify(task),
      success: function (data) {
        swal(
          {
            title: "Success !",
            text: "Task created !",
            type: "success",
          },
          function () {
            window.location.reload();
          }
        );
      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
        if (xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0)
          warning("The server is down !");
        else warning(JSON.parse(xmlHttpRequest.responseText).message);
      },
    });
  };

  const saveAsDataft = (task) => {
    $.ajax({
      type: "POST",
      url: $host_name + "/create-task",
      dataType: "json",
      headers: { "Content-Type": "application/json", charset: "utf-8" },
      data: JSON.stringify(task),
      success: function (data) {
        swal(
          {
            title: "Success !",
            text: "Task Saved as Draft !",
            type: "warning",
          },
          function () {
            window.location.reload();
          }
        );
      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
        if (xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0)
          warning("The server is down !");
        else warning(JSON.parse(xmlHttpRequest.responseText).message);
      },
    });
  };

  $("#description").keyup(function (e) {
    if ($(this).val().length > 99) $(this).css("background-color", "#FFE4C4");

    if ($(this).val().length <= 99) $(this).css("background-color", "#caf4c0");

    $("#descriptiont").text($(this).val().length);
  });

  let prior;

  $("#priority1").click(function () {
    prior = $(this).val();
  });
  $("#priority2").click(function () {
    prior = $(this).val();
  });
  $("#priority3").click(function () {
    prior = $(this).val();
  });

  // Register a task
  $(".submit").on("click", function (e) {
    $(".modal-title").text("Create Task");
    e.preventDefault();
    let id = $("#id").val();
    let title = $("#title").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    let description = $("#description").val();
    let attachment = $("#attachment-input").val();
    let assignees = [];
    let projects = [];
    projects = $(".project").val();

    $('input[name="assignees"]').each(function () {
      assignees.push(this.value);
    });

    let task = {
      id: id,
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      priority: prior,
      assignees: assignees,
      projects: projects,
      attachment: attachment,
      status: "progress",
    };
    if (title.length > 0) {
      registerTask(task);
    } else {
      warning("Title is required !");
    }
  });

  // Save a task as draft
  $(".save-as-draft").on("click", function (e) {
    e.preventDefault();
    let title = $("#title").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    let description = $("#description").val();
    let attachment = $("#attachment-input").val();
    let assignees = [];
    let projects = [];
    projects = $(".project").val();
    $('input[name="assignees"]').each(function () {
      assignees.push(this.value);
    });
    let task = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      priority: prior,
      assignees: assignees,
      projects: projects,
      attachment: attachment,
      status: "DRAFT",
    };
    if (title.length > 0) {
      saveAsDataft(task);
    } else {
      warning("Title is required !");
    }
  });

  $(function () {
    $("#startDate").datepicker({
      dateFormat: "yy-mm-dd",
    });
  });

  $(function () {
    $("#endDate").datepicker({
      dateFormat: "yy-mm-dd",
    });
  });

  // View all projects
  const getProjects = () => {
    $.ajax({
      type: "GET",
      url: $host_name + "/all-projects",
      headers: { "Content-Type": "application/json" },
      dataType: "json",
      success: function (data) {
        // assign project
        projects = data;
        let project = $(".project");
        project.empty();
        for (var i = 0; i < data.length; i++) {
          project.append(
            "<option value=" +
              data[i].id +
              ">" +
              i +
              ") " +
              data[i].name +
              "</option>"
          );
        }
        project.change();
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
  };

  const getUsers = () => {
    $.ajax({
      type: "GET",
      url: $host_name + "/all-users",
      headers: { "Content-Type": "application/json" },
      dataType: "json",
      success: function (data) {
        let assignee = $(".assignee");
        assignee.empty();
        for (var i = 0; i < data.length; i++) {
          assignee.append(
            "<option  value=" +
              data[i].id +
              ">" +
              data[i].firstName +
              " " +
              data[i].lastName +
              "</option>"
          );
        }
        assignee.change();
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
  };

  getProjects();
  getUsers();

  const registerProject = () => {
    let project = {
      name: $("#pName").val(),
    };
    $.ajax({
      type: "POST",
      url: $host_name + "/create-project",
      dataType: "json",
      headers: { "Content-Type": "application/json", charset: "utf-8" },
      data: JSON.stringify(project),
      success: function (data) {
        swal({
          title: "Success !",
          text: "Project created as successfully!",
          type: "success",
        });
        getProjects();
        $("#pName").val("");
      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
        if (xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0)
          warning("The server is down !");
        else warning(JSON.parse(xmlHttpRequest.responseText).message);
      },
    });
  };

  function attachmentUpload(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      $("#attachment-input").empty();
      reader.onload = function (e) {
        var profilePicLength = e.target.result;
        const profilePic = profilePicLength.split("base64,").pop();
        $("#attachment-input").val(profilePic);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imageUpload").change(function () {
    attachmentUpload(this);
  });

  $(".saveProject").click(function (e) {
    e.preventDefault();
    if ($("#pName").val().length > 0) {
      registerProject();
    } else {
      warning("Please add project name");
    }
  });
});

const updateTask = (id) => {
  $(".save-as-draft").css("display", "none");
  $(".modal-title").text("Update Task");
  $.ajax({
    type: "GET",
    url: $host_name + "/update-task/" + id,
    dataType: "json",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
    success: function (data) {
      let task = data.data;
      if (task != null) {
        $("#title").val(task.title);
        $("#id").val(task.id);
        $("#startDate").val(task.startDate);
        $("#endDate").val(task.endDate);
        $("#description").val(task.description);
        $("#attachment-input").val(task.attachment);
        let todoListItem = $(".todo-list");
        let item;
        $.each(task.assignees, function (key, val) {
          item = $(this).prevAll(".todo-list-input").val();
          // if (item) {
          todoListItem.append(
            "<li><div class='form-check'><label class='form-check-label'>" +
              val +
              "<i class='input-helper'></i></label><input type='hidden' value='" +
              val +
              "' name='assignees'></input></div><i class='remove mdi mdi-close-circle-outline'></i></li>"
          );
          // }
        });

        projectSection.css("display", "block");
        projectSection.empty();

        $.each(task.projects, function (k, v) {
          $.each(projects, function (e, d) {
            if (v === d.id)
              projectSection.append(
                '<span class="col-lg-3"><label class="container">' +
                  d.name +
                  ' <input onclick="selectProject($(this));" checked class="check-box input" value="' +
                  d.id +
                  '"type="checkbox"><span class="checkmark"></span></label></span>'
              );
          });
        });

        // $(".assignee").trigger('change');
        // $.each(userLevel, function (key, val) {
        //     //console.log(val);
        //     $("#edituserLevel").append(
        //         new Option(
        //             val.levelsVO.sytemlevel,
        //             val.levelsVO.id,
        //             defaultSelected,
        //             nowSelected
        //         )
        //     );
        // });

        // let assignees = [];
        // assignees = $(".assignee").val();
        // let projects = [];
        // projects = $(".project").val();
      }
    },
    error: function (xmlHttpRequest, textStatus, errorThrown) {
      if (xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0)
        warning("The server is down !");
      else warning(JSON.parse(xmlHttpRequest.responseText).message);
    },
  });
};

function selectProject(v) {
  console.log(v);
}

// file download
function downloadPDF(pdf) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = "qt-file-downloaded";
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
