let $host_name = "http://localhost:8080";

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
        localStorage.setItem(
          "user-id", data.user.id
        );

        localStorage.setItem(
          "user-firstName", data.user.firstName
        );

        localStorage.setItem(
          "user-photo", data.user.photo
        );

        localStorage.setItem(
          "user-lastName", data.user.lastName
        );

        localStorage.setItem(
          "user-gender", data.user.gender
        );

        localStorage.setItem(
          "user-username", data.user.username
        );

        localStorage.setItem(
          "user-password", data.user.password
        );


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

  const datafunc = (data) => {
    $("#table").DataTable({
      buttons: ["copy", "csv", "excel", "pdf", "print"],
      destroy: true,
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
        { data: "status" ,
        render: function (data, type,row) {
          if(data != null || data == 'DRAFT')return '<span class="btn btn-sm btn-warning">'+data+'</span>'
          else return '<span class="btn btn-sm btn-info">Inprogress</span>'},
      },
        {
                data: "attachment",
                render: function (data, type,row) {
                  let id =  row.id;
                  let file =  data;
                    if (data.length>10) return '<span><a onClick="downloadPDF('+"'"+file+"'"+')" class="btn btn-link"><i class="fa fa-download"></i></a></span><span><a onClick="updateTask('+"'"+id+"'"+')"  data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-link"><i class="fa fa-pencil"></i></a></span>';
                    else return '</span><span><a onClick="updateTask('+"'"+id+"'"+')"  data-toggle="modal" data-target=".bd-example-modal-lg" class="btn btn-link"><i class="fa fa-pencil"></i></a></span>';
                },
            },
      ],
    });
  };

  loadData();

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

  $(".submit").on("click", function (e) {
    e.preventDefault();
    let title = $("#title").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    let description = $("#description").val();
    let attachment = $("#attachment-input").val();
    let assignees = [];
    assignees = $(".assignee").val();
    let projects = [];
    projects = $(".project").val();

    let task = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      priority: prior,
      assignees: assignees,
      projects: projects,
      attachment: attachment,
      status:"progress",
    };
    if (title.length > 0) {
      registerTask(task);
    } else {
      warning("Title is required !");
    }
  });


  $(".save-as-draft").on("click", function (e) {
    e.preventDefault();
    let title = $("#title").val();
    let startDate = $("#startDate").val();
    let endDate = $("#endDate").val();
    let description = $("#description").val();
    let attachment = $("#attachment-input").val();
    let assignees = [];
    assignees = $(".assignee").val();
    let projects = [];
    projects = $(".project").val();

    let task = {
      title: title,
      startDate: startDate,
      endDate: endDate,
      description: description,
      priority: prior,
      assignees: assignees,
      projects: projects,
      attachment: attachment,
      status:"DRAFT",
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
        let project = $(".project");
        project.empty();
        for (var i = 0; i < data.length; i++) {
          project.append(
            "<option value=" + data[i].id + ">" + data[i].name + "</option>"
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
    if($("#pName").val().length>0){
      registerProject();
    }else{
      warning("Please add project name");
    }
  });
});


const updateTask = (id) => {
  $.ajax({
    type: "GET",
    url: $host_name + "/update-task/"+id,
    dataType: "json",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
    success: function (data) {
      let task = data.data;
      if(task != null){
        $("#title").val(task.title);
        $("#startDate").val(task.startDate);
        $("#endDate").val(task.endDate);
       $("#description").val(task.description);
      $("#attachment-input").val(task.attachment);
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


// file download
function downloadPDF(pdf) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = "qt-file-downloaded";
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
