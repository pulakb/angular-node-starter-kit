cloudStbApp.filter('columWidth', function () {
  return function (displayDuration, prgLen) {

    var width = 828;
    var widthWithBorder = width - (prgLen * 4);
    var pixcelPerMin = widthWithBorder/90;

    var arrowsWidth=0; 

    var calculatedWidth = Math.round((displayDuration *  pixcelPerMin-(arrowsWidth+30)))+"px";

    return calculatedWidth;

  };
});