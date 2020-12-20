var userForm = document.getElementById("user_form");
var userEmail = document.getElementById("user_email");
var userPassword = document.getElementById("user_password");
var userPasswordConfirm = document.getElementById("user_password_confirm");
var btnSubmit = document.getElementById("btn_submit");
var btnCancel = document.getElementById("btn_cancel");

userForm.onsubmit = function(e) {
  e.preventDefault();

  if(this.getAttribute("isnew")) {
    // TODO: POST /users/register
  } else {
    // TODO: PATCH /users/edit
  }
};

btnCancel.onclick = function(e) {
  window.location.href = "/users/";
};