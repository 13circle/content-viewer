var userForm = document.getElementById("user_form");
var userEmail = document.getElementById("user_email");
var userPassword = document.getElementById("user_password");
var btnLogin = document.getElementById("btn_login");
var btnRegister = document.getElementById("btn_register");

btnRegister.onclick = function(e) {
  window.location.href = "/users/register";
};
