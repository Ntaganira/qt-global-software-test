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
        $("#profilePictureInput").val(
          `data:image/png;base64,${profilePic}`
        );
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#imageUpload").change(function () {
    readURL(this);
  }); 
//  End Image 
  const success = (message) =>{
      swal("Success !", message, "success");
    }

    const error = (message) =>{
      swal("Ooops !", message, "error");
    }
    
    const warning = (message) =>{
      swal("Ooops !", message, "warning");
    }
    
    const loadData = () =>{
      $.ajax({
        type: "GET",
        url: $host_name + "/all-tasks",
        headers: { 'Content-Type': 'application/json'},
        dataType: "json",
        success: function (data) {
          datafunc(data);
        },
        error:function (xmlHttpRequest,textStatus, errorThrown){
          if(xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0) {
            warning('The server is down !');
            return;
          }else{
             error (textStatus);
             return;
          }
        }
      });
    }

    const datafunc = (data) => {
      $("#table").DataTable({
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
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
  }

    loadData();

    const registerTask = (task) =>{
      
      $.ajax({
        type: "POST",
        url: $host_name + "/create-task",
        dataType: "json",
        headers : {'Content-Type': 'application/json', 'charset': 'utf-8'},
        data: JSON.stringify(task),
        success: function (data) {
            success(data.data);
        },
        error:function (xmlHttpRequest, textStatus, errorThrown){
          if(xmlHttpRequest.readyState == 0 || xmlHttpRequest.status == 0) 
            warning('The server is down !');
          else
            warning(JSON.parse(xmlHttpRequest.responseText).message);
        }
      });
    }

    $('.submit').on("click",function(e){
      e.preventDefault();
      let title = $("#title").val();
      let startDate = $("#startDate").val();
      let endDate = $("#endDate").val();
      let description = $("#description").val();
      let priority1 = $("#priority1").val();
      let priority2 = $("#priority2").val();
      let priority3 = $("#priority3").val();
      let assignees = [];
      assignees = $('.assignee').val();
      let projects = [];
      projects = $('.project').val();

      let task = {
        title: title,
        startDate:startDate,
        endDate:endDate,
        description: description,
        priority1:priority1,
        priority2:priority2,
        priority3: priority3
      };
      registerTask(task);
      
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
});
