var viewer;

window.onload = function () {
  viewer = document.getElementById("viewer");
  var maxH =
    window.screen.availHeight - (window.outerHeight - window.innerHeight) - 110;
  viewer.style.height = maxH + "px";
};
