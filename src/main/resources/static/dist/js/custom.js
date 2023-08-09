$(document).ready(function () {
  let $host_name = "http://localhost:8080";

  // image
  $(document).ready(function () {
    let currentImage = $("#profilePictureInput").val();
    let uri = currentImage != null ? currentImage : "";
    $("#imagePreview").css("background-image", "url(" + uri + ")");
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      $("#profilePictureInput").empty();
      reader.onload = function (e) {
        var profilePicLength = e.target.result;
        const profilePic = profilePicLength.split("base64,").pop();
        $("#imagePreview").css(
          "background-image",
          "url(" + e.target.result + ")"
        );
        $("#imagePreview").hide();
        $("#imagePreview").fadeIn(650);
        $("#profilePictureInput").val(`data:image/png;base64,${profilePic}`);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imageUpload").change(function () {
    readURL(this);
  });
  //  End Image
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
          "user-name",
          data.user.firstName + " " + data.user.lastName
        );
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

  $("#description").keyup(function (e) {
    if ($(this).val().length > 99) $(this).css("background-color", "#FFE4C4");

    if ($(this).val().length <= 99) $(this).css("background-color", "#54C571");

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
    };
    if (title.length > 0) {
      registerTask(task);
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
      },
      error: function (xmlHttpRequest, textStatus, errorThrown) {
        if (xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0)
          warning("The server is down !");
        else warning(JSON.parse(xmlHttpRequest.responseText).message);
      },
    });
  };

  $(".saveProject").click(function (e) {
    e.preventDefault();
    registerProject();
  });
});
