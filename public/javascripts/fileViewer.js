var viewer;

function resizeViewerHeight() {
  var maxH = window.innerHeight - 110;
  viewer.style.height = maxH + "px";
}

window.onload = function () {
  viewer = document.getElementById("viewer");
  resizeViewerHeight();
};

window.onresize = function () {
  resizeViewerHeight();
};
