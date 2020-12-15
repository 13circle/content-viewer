window.onload = function () {
  var link_btns = document.querySelectorAll(".link_btn");
  for (var i = 0; i < link_btns.length; i++) {
    link_btns[i].onclick = function (e) {
      window.location.href = this.querySelector(".path_link").getAttribute("href");
    };
  }
};
