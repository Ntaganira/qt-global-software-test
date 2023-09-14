$(function () {
  var todoListItem = $(".todo-list");
  var todoListInput = $(".todo-list-input");
  $(".todo-list-add-btn").on("click", function (e) {
    e.preventDefault();

    var item = $(this).prevAll(".todo-list-input").val();

    if (item) {
      todoListItem.append(
        "<li><div class='form-check'><label class='form-check-label'>" +
          item +
          "<i class='input-helper'></i></label><input type='hidden' value='" +
          item +
          "' name='assignees'></input></div><i class='remove mdi mdi-close-circle-outline'></i></li>"
      );
      todoListInput.val("");
    }
  });

  todoListItem.on("click", ".remove", function () {
    $(this).parent().remove();
  });
});
